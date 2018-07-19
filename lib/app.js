const express = require('express');
const app = express();
const morgan = require('morgan');
// const createLocationWeather = require('./util/create-location')();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
// app.use('/api/tours/:id/stops', createLocationWeather);

// ROUTES
const tours = require('./routes/tours');
app.use('/api/tours', tours);

const { handler, api404 } = require('./util/errors');

app.use('/api', api404);
app.use((req, res) => {
    res.sendStatus(404);
});

app.use(handler);

module.exports = app;