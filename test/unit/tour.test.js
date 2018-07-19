const chai = require('chai');
const { assert } = chai;
const Tour = require('../../lib/models/tour');
// const { getErrors } = require('./helpers');

describe('Tour data model', () => {
    
    it('validates a good model', () => {
        const data = {
            title: 'The Amazing Tour!',
            activities: ['fire breathing', 'chimpanzees', 'creepy clowns'],
            launchDate: new Date(),
            stops: [
                {
                    location: {
                        city: 'Portland',
                        state: 'Oregon',
                        zip: 97209
                    },
                    weather: {
                        temperature: 75,
                        condition: 'Windy'
                    },
                    attendance: 5000
                },
                {
                    location: {
                        city: 'Seattle',
                        state: 'Washington',
                        zip: 98101
                    },
                    weather: {
                        temperature: 81,
                        condition: 'Mild'
                    },
                    attendance: 7500
                },
                {
                    location: {
                        city: 'Boise',
                        state: 'Idaho',
                        zip: 83701
                    },
                    weather: {
                        temperature: 55,
                        condition: 'Chilly'
                    },
                    attendance: 1000
                },
            ]
        };
        const tour = new Tour(data);

        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });
});