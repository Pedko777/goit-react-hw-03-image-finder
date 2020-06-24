import React, { Component } from 'react';
import styles from './searchbar.module.css';

const {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} = styles;

export default class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
    // console.log(e.target.value)
  };

  handleSubmit = e => {
    e.preventDefault();
    
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={Searchbar}>
        <form className={SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={SearchFormButton}>
            <span className={SearchFormButtonLabel}>Search</span>
          </button>
          <input
            required
            className={SearchFormInput}
            value={this.state.inputValue}
            onChange={this.handleChange}
            type="text"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
  
}

