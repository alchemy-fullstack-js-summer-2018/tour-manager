const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Tour API', () => {

    beforeEach(() => dropCollection('tours'));

    let tour;

    beforeEach(() => {
        const data = {
            title: 'Grand Tour',
            activities: ['racing', 'drifting', 'drinking'],
            launchDate: new Date,
            stops: [{
                location: {
                    city: 'Portland'
                },
                weather: {
                    temperature: 50
                },
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

    it('Gets a tour by Id', () => {
        return request
            .get(`/api/tours/${tour._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, tour);
            });
    });

});