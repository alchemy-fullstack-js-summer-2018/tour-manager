const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'Expected 200 http status code');
    return res;
};

describe('Tour API', () => {

    beforeEach(() => dropCollection('tours'));

    let tour;
    let tour2;

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

    beforeEach(() => {
        const data = {
            title: 'Red Tour',
            activities: ['racing', 'riding', 'running'],
            launchDate: new Date,
            stops: [{
                location: {
                    city: 'Seattle'
                },
                weather: {
                    temperature: 70
                },
                attendance: 4
            }]
        };

        return request
            .post('/api/tours')
            .send(data)
            .then(({ body }) => tour2 = body);
    });

    it('Saves a tour/tours', () => {
        assert.isOk(tour._id);
        assert.isOk(tour2._id);
    });

    it('Gets a list of tours', () => {
        return request
            .get('/api/tours')
            .then(({ body }) => {
                assert.equal(body[0].title, ['Grand Tour']);
                assert.equal(body[1].title, ['Red Tour']);
            });
    });

    it('Gets a tour by Id', () => {
        return request
            .get(`/api/tours/${tour._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, tour);
            });
    });

    function addStop(title, stop) {
        return request
            .post(`/api/tours/${tour._id}/stops`)
            .send(stop)
            .then(checkOk)
            .then(({ body }) => body);
    }

    it('Adds a stop to a tour', () => {
        const burningMan = {
            location: {
                city: 'El Paso',
                state: 'Texas',
                zip: 80514
            },
            weather: {
                temperature: 80
            },
            attendance: 100
        };

        return addStop(tour, burningMan)
            .then(stop => {
                assert.isDefined(stop._id);
                assert.equal(stop.title, burningMan.title);
            });
    });

});