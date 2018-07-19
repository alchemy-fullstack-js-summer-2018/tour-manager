const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());


//routes
const tours = require('./routes/tours');

app.use('/api/tours', tours);

const { handler, api404 } = require('./util/errors');

app.use('/api', api404);
// general 404
app.use((requestAnimationFrame, res) => {
    res.sendStatus(404);
});

// eslint-disable-net-line
app.use(handler);

module.exports = app;