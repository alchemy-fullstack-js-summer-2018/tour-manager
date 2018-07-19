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
            city: {
                type: String,
            },
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

module.exports = mongoose.model('Tours', schema);   