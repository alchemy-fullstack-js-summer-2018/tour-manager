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
        return save({ title: 'Amazing Tour' })
            .then(data => {
                tourA = data;
            });
    });
    beforeEach(() => {
        return save({ title: 'Incredible Tour' })
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