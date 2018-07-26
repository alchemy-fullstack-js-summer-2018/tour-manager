const express = require('express');
const app = express();
const morgan = require('morgan');

//middleware stuffs
app.use(morgan('dev'));
//app.use(express.static('public'));
app.use(express.json());

//routes
const tours = require('./routes/tours');

app.use('/api/tours', tours);

// 404 stuff goes below
// including app handler last before module
//const { handler, api404 } = require('./util/errors');


// app.use('./api', api404);
// app.use((req, res) => {
//     res.sendStatus(404);
// });

// app.use(handler);

module.exports = app;