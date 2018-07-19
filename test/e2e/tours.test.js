const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Tour API', () => {

    beforeEach(() => dropCollection('tours'));

    let tour;

    beforeEach(() => {
        const data = {
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

        return request
            .post('/api/tours')
            .send(data)
            .then(({ body }) => tour = body);
    });

    it('Saves a tour', () => {
        assert.isOk(tour._id);
    });

});