const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};
describe('Tours API', () => {
    
    beforeEach(() => dropCollection('tours'));

    let universoul;
    beforeEach(() => {
        return request
            .post('/api/tours')
            .send({
                title: 'UniverSoul Circus',
                activities: ['flying trapeze', 'carnival rides', 'carnival games'],
                launchDate: new Date(1998, 6, 1)
            })
            .then((res) => {
                universoul = res.body;
            });
    });

    it('saves a tour', () => {
        assert.isOk(universoul._id);
    });

    it('gets a tour', () => {
        return request
            .get('/api/tours/' + universoul._id)
            .then(checkOk)
            .then((res) => {
                assert.deepEqual(res.body._id, universoul._id);
            });
    });

    it('gets a tour by id', () => {
        return request
            .get(`/api/tours/${universoul._id}`)
            .then(({ body }) => {
                console.log(body);
                assert.deepEqual(body, universoul);
            });
    });
});
