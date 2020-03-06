import React from 'react';
import './styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinClicked: 0,
      rollScoreCounted: 0,
      pins: 0,
      currentFrame: 1,
      roll: 1,
      frames: {
        1: {
          rolls: {
            1: 0,
            2: 0
          },
          bonusRollCount: 0, // 0, 1, or 2
          frameTotal: 0
        },
        2: {
          rolls: {
            1: 0,
            2: 0
          },
          bonusRollCount: 0,
          frameTotal: 0
        },
        3: {
          rolls: {
            1: 0,
            2: 0
          },
          bonusRollCount: 0,
          frameTotal: 0
        }
      }
    };

    this.handlePinClick = this.handlePinClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pinClicked > prevState.pinClicked) {
      this.handleRollScore(this.state.pins);
    }

    if (prevState.rollScoreCounted !== this.state.rollScoreCounted) {
      this.checkForOutstandingBonusRolls();
    }
  }

  handlePinClick(e) {
    if (e.target.closest('.App-pin') === null) {
      return;
    }

    const pins = parseInt(e.target.closest('.App-pin').id, 10);

    for (let i = pins; i >= 1; i--) {
      document.getElementById(i).style.cssText = 'background-color: black; color: white; transition: all 0.2s ease;';
    }

    setTimeout(() => {
      for (let i = pins; i >= 1; i--) {
        document.getElementById(i).removeAttribute('style');
      }
    }, 500);

    this.setState((prevState) => {
      return {
        pins,
        pinClicked: prevState.pinClicked + 1
      }
    });
  }

  handleRollScore(pins) {
    const { currentFrame, roll, frames } = this.state;

    if (roll === 1) {
      this.setState((prevState) => {
        prevState.frames[currentFrame].rolls[roll] = pins;
        prevState.frames[currentFrame].frameTotal = pins;
        prevState.roll = 2;

        if (pins === 10) {
          prevState.frames[currentFrame].bonusRollCount = 2;
          prevState.roll = 1;
        }

        return {
          rollScoreCounted: prevState.rollScoreCounted + 1,
          roll: prevState.roll,
          frames: prevState.frames
        };
      });

    } else if (roll === 2) {
      this.setState((prevState) => {
        prevState.frames[currentFrame].rolls[roll] = pins;
        prevState.frames[currentFrame].frameTotal += pins;
        prevState.roll = 1;

        if (prevState.frames[currentFrame].frameTotal === 10) {
          prevState.frames[currentFrame].bonusRollCount = 1;
        }

        return {
          rollScoreCounted: prevState.rollScoreCounted + 1,
          roll: prevState.roll,
          frames: prevState.frames
        };
      });
    }
  }

  checkForOutstandingBonusRolls() {
    const { currentFrame, frames, roll, pins, pinClicked } = this.state;

    if (currentFrame === 1 && pins === 10) {
      this.setState((prevState) => ({ currentFrame: prevState.currentFrame + 1 }));

    } else if (currentFrame === 1 && pinClicked === 2) {
      this.setState((prevState) => ({ currentFrame: prevState.currentFrame + 1 }));

    } else if (currentFrame === 2) {
      this.addToFrameWithBonusRoll(currentFrame - 1, 'incrementCurrentFrame');


    } else if (currentFrame > 2) {
      this.addToFrameWithBonusRoll(currentFrame - 2);
      this.addToFrameWithBonusRoll(currentFrame - 1, 'incrementCurrentFrame');


    }
  }

  addToFrameWithBonusRoll(frame) {
    if (arguments[1] === 'incrementCurrentFrame') {
      if (this.state.frames[frame].bonusRollCount) {
        this.setState((prevState) => {
          prevState.frames[frame].frameTotal += this.state.pins;
          prevState.frames[frame].bonusRollCount--;

          return { frames: prevState.frames, currentFrame: prevState.currentFrame + 1 }; // currentFrame increment will have to change
        });
      } else {
        this.setState((prevState) => {
          return { currentFrame: prevState.currentFrame + 1 }; // currentFrame increment will have to change
        });
      }

    } else {
      if (this.state.frames[frame].bonusRollCount) {
        this.setState((prevState) => {
          prevState.frames[frame].frameTotal += this.state.pins;
          prevState.frames[frame].bonusRollCount--;

          return { frames: prevState.frames };
        });
      }
    }
  }

  render() {
    return (
      <div className='App'>

        <div><h1>Frame: {this.state.currentFrame} Roll: {this.state.roll}</h1></div>

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

        <div className='App-score-card'>
          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[1].rolls[1]}</div>
              <div className='App-frame-roll2'>{this.state.frames[1].rolls[2]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[1].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[2].rolls[1]}</div>
              <div className='App-frame-roll2'>{this.state.frames[2].rolls[2]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[2].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[3].rolls[1]}</div>
              <div className='App-frame-roll2'>{this.state.frames[3].rolls[2]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[3].frameTotal}</div>
          </div>

          {/* <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[4].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[4].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[4].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[5].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[5].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[5].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[6].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[6].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[6].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[7].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[7].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[7].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[8].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[8].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[8].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[9].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[9].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[9].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[10].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[10].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[10].frameTotal}</div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default App;