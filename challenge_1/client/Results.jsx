import React from 'react';
import ResultItem from './ResultItem.jsx';


class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.searchResults.map((result, i) => <ResultItem key={i} data={result} />)}
      </div>
    );
  }
}

export default Results;