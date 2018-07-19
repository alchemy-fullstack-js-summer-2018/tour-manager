const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 HTTP status code');
    return res;
};

describe('Tours API', () => {
    beforeEach(() => dropCollection('tours'));
    let tables;

    beforeEach(() => {
        const data = {
            title: 'Tables & Chairs',
            activities: ['pony rides', 'dancing bears', 'band'],
            launchDate: new Date(2019, 2, 18),
            stops: []
        };
        return request
            .post('/api/tours')
            .send(data)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body.title, data.title);
                tables = body;
            });
    });

    it('should GET all tours', () => {
        return request
            .get('/api/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [tables]);
            });
    });

    it('should GET a tour by id', () => {
        return request
            .get(`/api/tours/${tables._id}`)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, tables);
            });
    });

    describe('Tours API - error handler', () => {

        it('should throw 404 error on bad path', () => {
            return request
                .get('/api/stops')
                .then(res => {
                    assert.equal(res.status, 404);
                });
        });
    });

});