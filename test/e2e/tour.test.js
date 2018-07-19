
const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const getStopsInfo = require('../../weather-service-example');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe('Tour API', () => {

    beforeEach(() => dropCollection('tours'));

    function save(tour) {
        return request
            .post('/api/tours')
            .send(tour)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let whiskeyPirates;

    beforeEach(() => {
        return save({
            title: 'Whiskey Pirates',
            activities: ['drunk juggling', 'fire whiskey shots'],
        })
            .then(data => whiskeyPirates = data);
    });

    it('saves a tour', () => {
        assert.isOk(whiskeyPirates._id);
    });

    it('gets a tour by id', () => {
        return request
            .get(`/api/tours/${whiskeyPirates._id}`)
            .then(({ body }) => {
                assert.deepEqual(body._id, whiskeyPirates._id);
            });
    });

    it('gets a list of all the tours', () => {
        let cuteCats;
        return save({ title: 'Cute Cats' })
            .then(_cuteCats => {
                cuteCats = _cuteCats;
                return request.get('/api/tours');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [whiskeyPirates, cuteCats]);
            });
    });

    it.skip('will get location data from Wunderground API', () => {
        return getStopsInfo('97070')
            .then(data => {
                console.log(data);
            });
    });

});