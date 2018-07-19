const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 status');
    return res;
};

describe.skip('Tours API', () => {

    beforeEach(() => dropCollection('tours'));

    function save(tour) {
        console.log('*****');
        return request
            .post('api/tours')
            .send(tour)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let jezbo;

    beforeEach(() => {
        return save({ title: 'Jezbo\'s Dark Carnival' })
            .then(data => {
                console.log('data', data);
                jezbo = data;
            });
    });

    it('saves a tour', () => {
        assert.isOk(jezbo._id);
    });

    it('gets tour by id', () => {
        return request
            .get(`/api/tours/${jezbo._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, jezbo);
            });
    });


});