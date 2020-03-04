import React from 'react';
import Calendar from 'react-calendar';
import './CSS/Calendar.css';


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
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(128,128,128)',
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
              }]
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
      <div>
        <h1>Bitcoin closing prices</h1>
        <canvas id="chart">Loading...</canvas>

        <div>
          <Calendar
            onChange={this.updateStartDate}
            value={this.state.startDate}
          />
        </div>

        <div>
          <Calendar
            onChange={this.updateEndDate}
            value={this.state.endDate}
          />
        </div>
      </div>
    );
  }
}

export default App;