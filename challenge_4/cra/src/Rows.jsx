import React from 'react';
import Columns from './Columns.jsx';
import './App.css';

class Rows extends React.Component {
  constructor(props) {
    super(props);

    this.createColumns = this.createColumns.bind(this);
  }

  createColumns(columns) {
    let allColumns = [];

    for (let i = 0; i < columns; i++) {
      allColumns.push(<Columns columns={this.props.rows} />) // props needed?
    }

    return allColumns;
  }

  render() {
    return (
      <div className='App-columns-container'>{this.createColumns(this.props.rows)}</div>
    );
  }
}

export default Rows;