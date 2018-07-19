const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected http 200 status code');
    return res;
};

describe('Tours API', () => {

    beforeEach(() => dropCollection('tours'));

    function save(tour) {
        return request
            .post('/api/tours')
            .send(tour)
            .then(checkOk)
            .then(({ body }) => body);
    }
    let tourA;
    let tourB;
    beforeEach(() => {
        return save({ title: 'The Amazing ULTRA Tour!',
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
            ] })
            .then(data => {
                tourA = data;
            });
    });
    beforeEach(() => {
        return save({ title: 'The Incredible Fantastical Tour!',
            activities: ['sword swallowers', 'murder', 'trapeze artists'],
            launchDate: new Date(),
            stops: [
                {
                    location: {
                        city: 'New York City',
                        state: 'New York',
                        zip: 10001
                    },
                    weather: {
                        temperature: 95,
                        condition: 'Clear'
                    },
                    attendance: 12000
                },
                {
                    location: {
                        city: 'Philadelphia',
                        state: 'Pennsylvania',
                        zip: 19019
                    },
                    weather: {
                        temperature: 84,
                        condition: 'Sunny'
                    },
                    attendance: 9500
                },
                {
                    location: {
                        city: 'Newark',
                        state: 'NJ',
                        zip: 17101
                    },
                    weather: {
                        temperature: 62,
                        condition: 'Cloudy'
                    },
                    attendance: 1500
                },
            ] })
            .then(data => {
                tourB = data;
            });
    });

    it('saves a tour', () => {
        assert.isOk(tourA._id);
        assert.isOk(tourB._id);
    });

    it('gets all tours', () => {
        return request
            .get('/api/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [tourA, tourB]);
            });
    });

    it('gets one tour by id', () => {
        return request
            .get(`/api/tours/${tourA._id}`)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, tourA);
            });
    });
});