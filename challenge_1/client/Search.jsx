import React from 'react';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    // handle XSS

    fetch(`/events?_start=0&_limit=10&q=${this.state.input.trim()}`)
      .then((results) => {
        this.props.getSearchResultsCount(results.headers.get('X-Total-Count'));
        return results.json();
      })
      .then((json) => this.props.setSearchResults(json, this.state.input.trim()))
      .catch((err) => console.log('error at Search.jsx, handleSubmit', err));
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          id='input'
          placeholder='Search'
          autoFocus
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button
          type='submit'
          value='Submit'
        >Submit</button>
      </form>
    );
  }
}

export default Search;