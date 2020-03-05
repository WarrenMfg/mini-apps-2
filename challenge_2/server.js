const express = require('express');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const cache = require('./cache/cache.json');


const app = express();
app.use(express.json());
app.use(morgan('dev'));


app.get('/bundle.js', (req, res) => {
  const gzip = zlib.createGzip();
  const stream = fs.createReadStream(path.resolve(__dirname, 'public/bundle.js'));
  res.set({
    'Content-Encoding': 'gzip',
    'Cache-Control': 'max-age=86400'
  });
  stream.pipe(gzip).pipe(res);
});

app.get('/api/last31Days', (req, res) => {
  // check cache first
  let ms = 86400000;
  let last31Days = {};
  let areLast31DaysCached = false;

  for (let i = 1; i <= 31; i++) {
    const date = new Date(new Date().valueOf() - (ms * i)).toJSON().split('T')[0];

    if (cache[date] !== undefined) {
      last31Days[date] = cache[date];
      areLast31DaysCached = true;
    } else {
      areLast31DaysCached = false;
      break;
    }
  }

  if (areLast31DaysCached) {
    res.send(last31Days);
  } else {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
      .then((response) => {
        res.send(response.data.bpi);

        fs.writeFile(path.resolve(__dirname, 'cache/cache.json'), JSON.stringify({...cache, ...response.data.bpi}), (err) => {
          if (err) {
            console.log('error /api/last31Days', err);
          }
        });
      })
      .catch((err) => res.sendStatus(404));
  }

});

app.get('/api/range/:dateRange', (req, res) => {
  // check dateRange
  // start=${start}&end=${end}
  let start = req.params.dateRange.split('&')[0].split('=')[1];
  let end = req.params.dateRange.split('&')[1].split('=')[1];
  let ms = 86400000;
  let userSelectedDateRange = {};
  let isDateRangeCached = false;

  for (let i = new Date(start).valueOf(); i <= new Date(end).valueOf(); i += ms) {
    const date = new Date(new Date(i).valueOf()).toJSON().split('T')[0];

    if (cache[date] !== undefined) {
      userSelectedDateRange[date] = cache[date];
      isDateRangeCached = true;
    } else {
      isDateRangeCached = false;
      break;
    }
  }

  if (isDateRangeCached) {
    res.send(userSelectedDateRange);
  } else {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?${req.params.dateRange}`)
      .then((response) => {
        res.send(response.data.bpi);

        fs.writeFile(path.resolve(__dirname, 'cache/cache.json'), JSON.stringify({...cache, ...response.data.bpi}), (err) => {
          if (err) {
            console.log('error /api/last31Days', err);
          }
        });
      })
      .catch((err) => res.sendStatus(404));
  }


  // axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?${req.params.dateRange}`)
  //   .then((response) => {
  //     res.set({
  //       'Cache-Control': 'max-age=604800' // one week
  //     });
  //     res.send(response.data);
  //   })
  //   .catch((err) => res.sendStatus(404));
});


app.use('/', express.static(path.resolve(__dirname, 'public')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));