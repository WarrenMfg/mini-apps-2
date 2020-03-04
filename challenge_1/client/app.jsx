import React from 'react';
import Search from './Search.jsx';
import Results from './Results.jsx';
import ReactPaginate from 'react-paginate';
import { Global, jsx } from '@emotion/core';
import CSS from './CSS/AppCSS.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchTerm: '',
      searchResultsCount: 0
    };

    this.setSearchResults = this.setSearchResults.bind(this);
    this.changePage = this.changePage.bind(this);
    this.getSearchResultsCount = this.getSearchResultsCount.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
  }

  setSearchResults(searchResults, searchTerm) {
    this.setState({ searchResults, searchTerm });
  }

  clearSearchResults() {
    this.setState({
      searchResults: [],
      searchTerm: '',
      searchResultsCount: 0
    });
  }

  changePage(e) {
    fetch(`/events?_start=${e.selected * 10}&_limit=10&q=${this.state.searchTerm}`)
      .then((results) => results.json())
      .then((json) => this.setSearchResults(json, this.state.searchTerm))
      .catch((err) => console.log('error at App.jsx, changePage', err));

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getSearchResultsCount(searchResultsCount) {
    this.setState({ searchResultsCount: parseInt(searchResultsCount, 10) });
  }

  render() {
    return (
      <div css={CSS.app}>
        <Global
          styles={CSS.Global}
        />

        <Search
          setSearchResults={this.setSearchResults}
          getSearchResultsCount={this.getSearchResultsCount}
          clearSearchResults={this.clearSearchResults}
        />

        <Results
          searchResults={this.state.searchResults}
        />

        {this.state.searchResultsCount > 0 &&
        <ReactPaginate
          pageCount={Math.ceil(this.state.searchResultsCount / 10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={this.changePage}
        />
        }
      </div>
    );
  }
}

export default App;