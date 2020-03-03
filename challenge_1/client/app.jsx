import React from 'react';
import Search from './Search.jsx';
import Results from './Results.jsx';
import ReactPaginate from 'react-paginate';


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
  }

  setSearchResults(searchResults, searchTerm) {
    this.setState({ searchResults, searchTerm });
  }

  changePage(e) {
    fetch(`/events?_start=${e.selected * 10}&_limit=10&q=${this.state.searchTerm}`)
      .then((results) => results.json())
      .then((json) => this.setSearchResults(json, this.state.searchTerm))
      .catch((err) => console.log('error at App.jsx, changePage', err));
  }

  getSearchResultsCount(searchResultsCount) {
    this.setState({ searchResultsCount: parseInt(searchResultsCount, 10) });
  }

  render() {
    return (
      <div>
        <Search
          setSearchResults={this.setSearchResults}
          getSearchResultsCount={this.getSearchResultsCount}
        />
        <Results searchResults={this.state.searchResults} />
        <ReactPaginate
          pageCount={Math.ceil(this.state.searchResultsCount / 10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={this.changePage}
        />
      </div>
    );
  }
}

export default App;