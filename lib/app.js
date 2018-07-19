const express = require('express');
const app = express();
//const morgan = require('morgan');

//middleware stuffs
// app.use(morgan('dev'));
// app.use(express.static('public'));
// app.use(express.json());

//routes
const tours = require('./routes/tours');

app.use('/api/tours', tours);

//404 stuff goes below
//including app handler last before module
//app.use(handler);

module.exports = app;