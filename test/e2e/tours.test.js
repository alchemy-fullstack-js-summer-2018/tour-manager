const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');

describe.only('Tours API', () => {

    beforeEach(() => dropCollection('tours'));

    let tour;

    const data = {
        title: 'P.T. Barnum\'s Circus at London',
        activities: ['tightrope', 'trapeze', 'lion tamer'],
        launchDate: new Date(2018, 7, 18),
        stops: [
            {
                location: {
                    city: 'London',
                    state: 'California',
                    zip: 92115
                },
                weather: {
                    temperature: 76,
                    condition: 'sunny'
                },
                attendance: 100
            },
            {
                location: {
                    city: 'San Diego',
                    state: 'California',
                    zip: 92115
                },
                weather: {
                    temperature: 75,
                    condition: 'sunny'
                },
                attendance: 400
            }
        ]
    };

    beforeEach(() => {
        return request  
            .post('/api/tours')
            .send(data)
            .then(({ body }) => tour = body);
    });

    it('saves a tour', () => {
        assert.isOk(tour._id);
    });

    it('returns a tour by id on GET', () => {
        return request
            .get(`/api/tours/${tour._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, tour);
            });
    });
});