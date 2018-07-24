const express = require('express');
const app = express();
const morgan = require('morgan');
const getWeather = require('./util/get-weather');
const appendWeather = require('./util/getWeather');

// middleware

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());


// routes
const tours = require('./routes/tours');

app.use('/api/tours', tours);
app.post('/api/tours/:id/stops', appendWeather(getWeather));


const { handler, api404 } = require('./util/errors');

// api 404
app.use('/api', api404);
// general 404
app.use((req, res) => {
    res.sendStatus(404);
});


// error handler (goes last!)
// eslint-disable-next-line
app.use(handler);

module.exports = app;
