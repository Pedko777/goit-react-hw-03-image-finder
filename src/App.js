import React, { Component } from 'react';
import imgApi from './services/imgApi';
import styles from './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    results: [],
  };

  handleSearchbarSubmit = query => {
    this.setState({
      searchQuery: query,
      results: [],
      page: 1,
      loading: false,
    });
  };

  componentWillMount() {
    imgApi
      .fetchImagesWithQuery()
      .then(data => console.log(data))
      .catch(error => {});
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    prevQuery !== nextQuery && this.fetchImages();
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({
      loading: true,
    });

    imgApi.fetchImagesWithQuery(searchQuery, page).then(images => {
      this.setState(prevState => ({
        results: [...prevState.results, ...images],
        page: prevState.page + 1,
      }));
    });
  };

  render() {
    const { results } = this.state;
    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery images={results} />
      </div>
    );
  }
}
