const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');


const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe('Tours API', () => {

    before(() => dropCollection('tours'));
    
    function save(tour) {
        return request
            .post('/api/tours')
            .send(tour)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let tour2;
    beforeEach(() => {
        return save({ title: 'Tour2' })
            .then(data => {
                tour2 = data;
            });
    });

    it('saves a tour', () => {
        assert.isOk(tour2._id);
    });
    
});

 