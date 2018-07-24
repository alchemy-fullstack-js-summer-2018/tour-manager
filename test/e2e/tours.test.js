const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected Error 200');
    return res;
};

describe('Tours tests', () => {
    beforeEach(() => dropCollection('tours'));
    let walrus;

    beforeEach(() => {
        const data = {
            title: 'Circus Walrus 2018 Tour',
            activities: ['trained walruses', 'fire eaters'],
            launchDate: new Date(2018, 7, 18)
        };
        return request 
            .post('/api/tours')
            .send(data)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body.title, data.title);
                walrus = body;
            });
    });

    it('returns ALL tours', () => {
        return request
            .get('/api/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [walrus]);
            });
    });

});
