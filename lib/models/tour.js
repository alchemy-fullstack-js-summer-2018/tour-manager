const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    activities: [String],
    launchDate: {
        type: Date,
        default: Date.now()
    },
    stops: [{
        location: {
            city: String,
            state: String,
            zip: String
        },
        weather: {
            avgTemp: String,
            description: String
        },
        attendance: {
            type: Number,
            min: 1
        }
    }]

});
module.exports = mongoose.model('Tour', schema);
// path | type info
// ---|---
// title | required title of the tour
// activities | array of string activities that will happen during the show
// launchDate | date tour will start. default to now
// stops | array of stop objects, see stop schema below

// path | type info
// ---|---
// location | object with city, state, and zip
// weather | object with weather conditions (see demo, choose some fields)
// attendance | number with min of 1