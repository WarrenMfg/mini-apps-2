const express = require('express');
const path = require('path');
const morgan = require('morgan');


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/', express.static(path.resolve(__dirname, 'public')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>  console.log(`Listening on port ${PORT}`));