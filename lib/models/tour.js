const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },

    activities: {
        type: String,
        enum: ['trapeze', 'lions', 'clowns']
    },
    
    launchDate: {
        type: Date,
        date: Date.now()
    },
    stops: [{
        location: {
            city: String,
            state: {
                type: String,
                required: true
            },
            zip: {
                type: Number,
                required: true
            },
        },
        weather: {
            zip: Number,
        
        },
        attendance: {
            type: Number,
            required: true,
            min: 1
        },
    }],
});

module.exports = mongoose.model('Tour', schema);