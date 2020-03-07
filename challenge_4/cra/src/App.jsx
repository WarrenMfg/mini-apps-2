import React from 'react';
import Rows from './Rows.jsx';
import './App.css';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
  return {
    // add to props
  };
};

export default connect()(App);


/*
watch this video: https://learn-2.galvanize.com/cohorts/1610/blocks/88/content_files/Redux/intro-to-redux.md

const { createStore } = Redux;

const initState = {
  matrix: makeMatrix() // pass in this.props.rows???
};

cosnt reducer = (state = initState, action) => { // returns new state

}

const store = createStore( // reference to reducer function goes here // );

const clickAction = { type: 'SQUARE_CLICKED' }; // must have type property

// when user clicks, add this to callback
store.dispatch(clickAction); // event emitter?

// when state changes, do this
store.subscribe(() => {

})

App --> dispatch an action --> reducer --> store
*/