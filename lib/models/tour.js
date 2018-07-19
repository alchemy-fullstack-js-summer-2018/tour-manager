const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    activities: [String],
    lunchDate: {
        type: Date,
        default: Date.now
    },
    stops: [{
        location: {
            city: String,
            state: String,
            zip: {
                type: Number,
                required: true
            }
        },
        weather: {
            temperature: Number,
            condition: String
        },
        attendance: Number

    }]

});

module.exports = mongoose.model('Tours', schema);   