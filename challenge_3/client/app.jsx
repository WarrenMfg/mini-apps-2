import React from 'react';
import './styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0
      },
      frame: 1,
      roll: 1,
      score: {
      },
      bonus: 0 // applied to current frame - 1
    };

    this.handlePinClick = this.handlePinClick.bind(this);
  }

  handlePinClick(e) {
    if (e.target.closest('.App-pin') === null) {
      return;
    }

    const target = e.target.closest('.App-pin').id;

    if (typeof target === 'string') {
      const pin = parseInt(target, 10);

      if (this.state.pins[pin]) { // if 1, make 0
        e.target.closest('.App-pin').style.cssText = 'background-color: white; color: black;';

        this.setState((prevState) => {
          prevState.pins[pin] = 0;
          this.handleRollScore(prevState.pins);
          return {pins: prevState.pins};
        });
      } else { // if 0, make 1
        e.target.closest('.App-pin').style.cssText = 'background-color: black; color: white;';

        this.setState((prevState) => {
          prevState.pins[pin] = 1;
          this.handleRollScore(prevState.pins);
          return {pins: prevState.pins};
        });
      }

    }
  }

  handleRollScore(pins) {
    const score = Object.entries(pins).reduce((acc, cur) => {return acc + cur[1]}, 0);
  }

  render() {
    return (
      <div className='App'>

        {/* Indicate frame and roll */}

        <div className='App-pin-container' onClick={this.handlePinClick}>
          <div className='App-pin-row'>
            <div className='App-pin' id='7'><span>7</span></div>
            <div className='App-pin' id='8'><span>8</span></div>
            <div className='App-pin' id='9'><span>9</span></div>
            <div className='App-pin' id='10'><span>10</span></div>
          </div>

          <div className='App-pin-row'>
            <div className='App-pin' id='4'><span>4</span></div>
            <div className='App-pin' id='5'><span>5</span></div>
            <div className='App-pin' id='6'><span>6</span></div>
          </div>

          <div className='App-pin-row'>
            <div className='App-pin' id='2'><span>2</span></div>
            <div className='App-pin' id='3'><span>3</span></div>
          </div>

          <div className='App-pin-row'>
            <div className='App-pin' id='1'><span>1</span></div>
          </div>
        </div>

        {/* Add frames/score */}
      </div>
    );
  }
}

export default App;