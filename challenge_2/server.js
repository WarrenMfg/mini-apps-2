const express = require('express');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');


const app = express();
app.use(express.json());
app.use(morgan('dev'));


app.get('/bundle.js', (req, res) => {
  const gzip = zlib.createGzip();
  const stream = fs.createReadStream(path.resolve(__dirname, 'public/bundle.js'));
  res.set({ 'Content-Encoding': 'gzip' });
  stream.pipe(gzip).pipe(res);
});

app.get('/api/last31Days', (req, res) => {
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
    .then((response) => {
      res.set({
        'Cache-Control': 'max-age=604800' // one week
      });
      res.send(response.data);
    })
    .catch((err) => res.sendStatus(404));
});

app.get('/api/range/:dateRange', (req, res) => {
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?${req.params.dateRange}`)
    .then((response) => {
      res.set({
        'Cache-Control': 'max-age=604800' // one week
      });
      res.send(response.data);
    })
    .catch((err) => res.sendStatus(404));
});
// `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`


app.use('/', express.static(path.resolve(__dirname, 'public')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));