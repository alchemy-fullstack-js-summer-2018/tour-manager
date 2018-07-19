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
    let tour;
    beforeEach(() => {
        return save({ title: 'Amazing Tour' })
            .then(data => {
                tour = data;
            });
    });

    it('saves a tour', () => {
        assert.isOk(tour._id);
    });
});