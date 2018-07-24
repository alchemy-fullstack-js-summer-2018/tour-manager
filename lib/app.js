const express = require('express');
const app = express();
// const morgan = require('morgan');

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
// app.use(morgan('dev'));
app.use(express.static(publicDir));
app.use(express.json());

const tour = require('./routes/tours');
app.use('/api/tours', tour);

module.exports = app;