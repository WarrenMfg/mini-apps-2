const express = require('express');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');


const app = express();
app.use(morgan('dev'));
app.use('/', express.static(path.resolve(__dirname, 'public')));


app.get('/bundle.js', (req, res) => {
  const gzip = zlib.createGzip();
  const stream = fs.createReadStream(path.resolve(__dirname, 'public/bundle.js'));
  res.set({ 'Content-Encoding': 'gzip' });
  stream.pipe(gzip).pipe(res);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));