const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));

const tour = require('./routes/tours');
app.use(express.json());

app.use('/api/tours', tour);

module.exports = app;