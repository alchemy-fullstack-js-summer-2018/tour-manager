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
                launchDate: new Date(1998, 6, 1),
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
                assert.deepEqual(body, universoul);
            });
    });

    function addStop(tour, stop) {
        return request
            .post(`/api/tours/${tour._id}/stops`)
            .send(stop)
            .then(checkOk)
            .then(({ body }) => body);
    }

    it('add a stop to this tour', () => {
        const jamestown = {
            location: {
                city: 'St Louis',
                state: 'MO',
                zip: 63034
            },
            weather: {
                temperature: '78 F',
                condition: 'Sunny'
            },
            attendance: 100
        };

        return addStop(universoul, jamestown)
            .then(stop => {
                assert.isDefined(stop._id);    
                assert.equal(stop.city, jamestown.city);
            });
    });

    // it('updates stops with number of attendance', () => {
    //     const data = { attendance: 1000 };
    //     return request
    //         .put(`/api/tours/${tour._id}/stops/${tour.stops[0].id}/attendance`)
    //         .send(data)
    //         .then(checkOk)
    //         . then(({ body }) => {
    //             assert.deepEqual(body.stops[0].attendance, 1000);
    //         });
    // });
    
});
