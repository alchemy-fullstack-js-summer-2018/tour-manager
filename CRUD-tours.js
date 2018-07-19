const mongoose = require('mongoose');
const connect = require('./lib/connect');
const Tour = require('./lib/models/tour');

connect('mongodb://localhost:27017/tour_test', { useNewUrlParser: true });

const body = {
    title: 'Grand Tour',
    activities: ['racing', 'drifting', 'time trail'],
    // launchDate: Date,
    stops: [{
        city: 'Portland',
        state: 'Oregon',
        zip: 97020,
        weather: 'rain',
        attendance: 2
    }]
};

Tour.create(body)
    .catch(console.log)
    .then(() => mongoose.connection.close());