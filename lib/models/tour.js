const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },

    activities: [String, String, String],

    launchDate: {
        type: Date,
        default: Date.now()
    },

    stops: [{
        location: {
            city: String,
            state: String,
            zip: Number,
        },
        weather:{
            temperature: Number,
            sunset: String,
        },
        attendance: {
            type: Number,
            min: 1,
        }
    }]
});

module.exports = mongoose.model('Tour', schema);