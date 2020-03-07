import React from 'react';
import './App.css';

class Columns extends React.Component {
  constructor(props) {
    super(props);

    this.createBox = this.createBox.bind(this);
  }

  createBox() {
    // use with props?
  }

  render() {
    return (
      <div className='App-square'>X</div>
    );
  }
}

export default Columns;