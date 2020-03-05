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
          bonusRollCount: 0, // 0, 1, or 2
          frameTotal: 0
        },
        3: {
          rolls: {
            1: 0,
            2: 0
          },
          bonusRollCount: 0, // 0, 1, or 2
          frameTotal: 0
        }
      }
    };

    this.handlePinClick = this.handlePinClick.bind(this);
  }

  handlePinClick(e) {
    if (e.target.closest('.App-pin') === null) {
      return;
    }

    const target = e.target.closest('.App-pin').id;

    if (typeof target === 'string') { // is this if statement needed now that I have first if statement?
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
    const { currentFrame, roll, frames } = this.state;
    const rollScore = Object.entries(pins).reduce((acc, cur) => {return acc + cur[1]}, 0);

    if (roll === 1) {
      this.setState((prevState) => {
        prevState.frames[currentFrame].rolls[roll] = rollScore;
        prevState.frames[currentFrame].frameTotal = rollScore;
        prevState.roll = 2;

        if (rollScore === 10) {
          prevState.frames[currentFrame].bonusRollCount = 2;
        }

        return { roll: prevState.roll, frames: prevState.frames };
      });

      if (currentFrame > 1) {
        this.checkForOutstandingBonusRolls(rollScore);
      }

    } else if (roll === 2) {
      prevState.frames[currentFrame].rolls[roll] = rollScore;
      prevState.frames[currentFrame].frameTotal += rollScore;
      prevState.currentFrame < 10 ? prevState.currentFrame++ : prevState.currentFrame = 10; // this will need to change
      prevState.roll = 1;

      if (prevState.frames[currentFrame].frameTotal === 10) {
        prevState.frames[currentFrame].bonusRollCount = 1;
      }

      return {
        currentFrame: prevState.currentFrame,
        roll: prevState.roll,
        frames: prevState.frames
      };

      if (currentFrame > 1) {
        this.checkForOutstandingBonusRolls(rollScore);
      }
    }
  }

  checkForOutstandingBonusRolls(score) {
    const { currentFrame, frames } = this.state;

    if (currentFrame === 2) {
      this.addToFrameWithBonusRoll(currentFrame - 1);
    } else if (currentFrame > 2) {
      this.addToFrameWithBonusRoll(currentFrame - 2);
      this.addToFrameWithBonusRoll(currentFrame - 1);
    }
  }

  addToFrameWithBonusRoll(frame) {
    if (frames[frame].bonusRollCount) {
      this.setState((prevState) => {
        prevState.frames[frame].frameTotal += score;
        prevState.frames[frame].bonusRollCount--;

        return { frames: prevState.frames };
      });
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
              <div className='App-frame-roll1'>{this.state.frames[1].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[1].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[1].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[2].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[2].rolls[this.state.roll]}</div>
            </div>
            <div className='App-frame-total'>{this.state.frames[2].frameTotal}</div>
          </div>

          <div className='App-frame'>
            <div className='App-frame-rolls'>
              <div className='App-frame-roll1'>{this.state.frames[3].rolls[this.state.roll]}</div>
              <div className='App-frame-roll2'>{this.state.frames[3].rolls[this.state.roll]}</div>
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