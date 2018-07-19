const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    activities: [String],
    launchDate: {
        type: String,
        default: Date().now
    },
    stops: [{
        location: {
            city: String,
            state: String,
            zip: Number
        },
        weather: {
            temperature: Number,
            condition: String
        },
        attendance: {
            type: Number,
            min: 1
        }
    }]
});

module.exports = mongoose.model('Tour', schema);