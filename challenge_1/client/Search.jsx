import React from 'react';
import { jsx } from '@emotion/core';
import CSS from './CSS/SearchCSS.js';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.input) {
      // handle XSS
      const input = DOMPurify.sanitize(this.state.input.trim());
      // console.log(DOMPurify.removed);

      fetch(`/events?_start=0&_limit=10&q=${input}`)
        .then((results) => {
          this.props.getSearchResultsCount(results.headers.get('X-Total-Count'));
          return results.json();
        })
        .then((json) => {
          this.props.setSearchResults(json, input);
          this.setState({ input: '' });
        })
        .catch((err) => console.log('error at Search.jsx, handleSubmit', err));
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  clearSearchResults() {
    this.setState({ input: '' });
    this.props.clearSearchResults();
    document.getElementById('input').focus();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} css={CSS.form}>
        <h1 css={CSS.header}>Historical Events Finder</h1>
        <div css={CSS.inputContainer}>
          <input
            type='text'
            id='input'
            placeholder='Search'
            autoFocus
            value={this.state.input}
            onChange={this.handleChange}
            css={CSS.input}
          />
          <button
            type='submit'
            value='Submit'
            css={CSS.submit}
          >Submit</button>
          <button
            type='button'
            value='Clear'
            onClick={this.clearSearchResults}
            css={CSS.clear}
          >Clear</button>
        </div>
      </form>
    );
  }
}

export default Search;