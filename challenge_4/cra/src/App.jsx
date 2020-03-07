import React from 'react';
import Rows from './Rows.jsx';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.createRows = this.createRows.bind(this);
  }

  createRows(rows) {
    let allRows = [];
    for (let i = 0; i < rows; i++) {
      allRows.push(<Rows rows={this.props.rows} />);
    }
    return allRows;
  }

  render() {
    return (
      <div className="App">
        <div className='App-rows-container'>{this.createRows(this.props.rows)}</div>
      </div>

    );
  }
}

export default App;


/*
const { createStore } = Redux;

const initState = {
  matrix: makeMatrix()
};

cosnt reducer = (state = initState, action) => {

}

const store = createStore( // reference to reducer function goes here // );

const clickAction = { type: 'SQUARE_CLICKED' };

// when user clicks, add this to callback
store.dispatch(clickAction);

// when state changes, do this
store.subscribe(() => {

})
*/