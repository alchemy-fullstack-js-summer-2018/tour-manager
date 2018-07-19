const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },

    activities: [String, String, String],

    // launchDate: {
    //     default: Date
    // },

    stops: [{
        city: String,
        state: String,
        zip: Number,
        weather: String,
        attendance: {
            type: Number,
            min: 1,
        }
    }]
});

module.exports = mongoose.model('Tour', schema);