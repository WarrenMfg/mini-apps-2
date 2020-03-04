import React from 'react';
import Calendar from 'react-calendar';
import './CSS/Calendar.css';
import './CSS/App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: [],
      startDate: null,
      endDate: null
    };

    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
  }

  componentDidMount() {
    // last 31 days
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json`)
      .then((response) => response.json())
      .then((response) => {
        const bpi = Object.entries(response.bpi);
        const labels = [];
        const data = [];
        bpi.forEach((tuple) => {
          labels.push(tuple[0]);
          data.push(tuple[1]);
        });

        const startDate = new Date(labels[0].split('-')[0], +labels[0].split('-')[1] - 1, labels[0].split('-')[2]);
        const endDate = new Date(labels[labels.length - 1].split('-')[0], +labels[labels.length - 1].split('-')[1] - 1, labels[labels.length - 1].split('-')[2]);

        this.setState({ labels, data, startDate, endDate });
      })
      .catch((err) => console.log('error in App.jsx, componentDidMount, fetch', err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
      const context = document.getElementById('chart').getContext('2d');
      const chart = new Chart(context, {
          type: 'line',
          data: {
              labels: this.state.labels,
              datasets: [{
                  label: 'Closing price (USD)',
                  backgroundColor: '#006edc',
                  borderColor: '#000',
                  data: this.state.data
              }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  callback: function(value, index, values) {
                    return '$' + value;
                  }
                }
              }],
            }
          }
      });
    }
  }

  fetchData(sd, ed) {
    const start = sd.toJSON().split('T')[0];
    const end = ed.toJSON().split('T')[0];

    // user-defined start and end dates
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
      .then((response) => response.json())
      .then((response) => {
        const bpi = Object.entries(response.bpi);
        const labels = [];
        const data = [];
        bpi.forEach((tuple) => {
          labels.push(tuple[0]);
          data.push(tuple[1]);
        });

        const startDate = new Date(labels[0].split('-')[0], +labels[0].split('-')[1] - 1, labels[0].split('-')[2]);
        const endDate = new Date(labels[labels.length - 1].split('-')[0], +labels[labels.length - 1].split('-')[1] - 1, labels[labels.length - 1].split('-')[2]);

        this.setState({ labels, data, startDate, endDate });
      })
      .catch((err) => console.log('error in App.jsx, componentDidMount, fetch', err));
  }

  updateStartDate(e) {
    if (e.valueOf() < this.state.endDate.valueOf()) {
      this.fetchData(e, this.state.endDate);
    }
  }

  updateEndDate(e) {
    if (e.valueOf() > this.state.startDate.valueOf()) {
      this.fetchData(this.state.startDate, e);
    }
  }

  render() {
    return (
      <div id='App'>
        <h1>Bitcoin closing prices</h1>

        <div id='chartContainer'>
          <canvas id="chart">Loading...</canvas>
        </div>

        <div id='calendars'>
          <div id='startDateContainer'>
            <p>Start date</p>
            <div id='startDate'>
              <Calendar
                onChange={this.updateStartDate}
                value={this.state.startDate}
              />
            </div>
          </div>

          <div id='endDateContainer'>
            <p>End date</p>
            <div id='endDate'>
              <Calendar
                onChange={this.updateEndDate}
                value={this.state.endDate}
              />
            </div>
          </div>
        </div>

        <div id='coindesk'><h2>Powered by CoinDesk</h2></div>
      </div>
    );
  }
}

export default App;