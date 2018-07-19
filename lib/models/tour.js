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
        date: Date.now(),
        
    },
    stops: [{
        location: {
            city: String,
            state: String,
            zip: Number,
            // required: true
            
        },
        weather: {
            temperature: Number,
            sunset: String,
            // require: true
        },
        attendance: {
            type: Number,
            min: 1,
            // required: true
        },
    }],
});

module.exports = mongoose.model('Tour', schema);