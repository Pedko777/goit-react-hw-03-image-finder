import React, { Component } from 'react';
import imgApi from './services/imgApi';
import styles from './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal/Modal';


export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    results: [],
    loading: false,
    firstFetch: true,
  };

  handleSearchbarSubmit = query => {
    this.setState({
      searchQuery: query,
      results: [],
      page: 1,
      firstFetch: true,
    });
  };

  // componentWillMount() {
  //   imgApi
  //     .fetchImagesWithQuery()
  //     .then(data => console.log(data))
  //     .catch(error => {});
  // }

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

    imgApi
      .fetchImagesWithQuery(searchQuery, page)
      .then(images => {
        this.setState(prevState => ({
          results: [...prevState.results, ...images],
          page: prevState.page + 1,
        }));
        if (!this.state.firstFetch) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({
          loading: false,
          firstFetch: false,
        });
      });
  };

  openModal = imageUrl => {
    this.setState({ modalImage: imageUrl });
  };

  closeModal = e => {
    this.setState({ modalImage: null });
  };

  render() {
    const { results, loading, modalImage } = this.state;
    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery images={results} onClick={this.openModal}/>
        {modalImage && (
          <Modal largeImage={modalImage} onClose={this.closeModal}/>
        )}
        {loading && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={120}
              width={120}
              timeout={3000}
            />
          </div>
        )}
        {results.length > 0 && !loading && (
          <Button onClick={this.fetchImages} />
        )}
      </div>
    );
  }
}
