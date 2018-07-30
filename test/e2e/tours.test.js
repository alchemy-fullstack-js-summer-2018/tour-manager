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
                stops: [{
                    location: {
                        city: 'St Louis',
                        state: 'MO',
                        zip: 63010
                    },
                    weather: {
                        temperature: '78 F',
                        condition: 'Sunny'
                    },
                    attendance: 100
                }]
            })
            .then((res) => {
                universoul = res.body;
            });
    });

    it('saves a tour', () => {
        assert.isOk(universoul._id);
    });

    it('gets all tours', () => {
        return request
            .get('/api/tours/')
            .then(checkOk)
            .then((res) => {
                assert.deepEqual(res.body, [universoul]);
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
                assert.deepEqual(stop.city, jamestown.city);
            });
    });


    it('updates stops with number of attendance', () => {

        const data = { attendance: 1000 };
        
        return request
            .put(`/api/tours/${universoul._id}/stops/${universoul.stops[0]._id}/attendance`)
            .send(data)
            .then(checkOk)
            . then(({ body }) => {
                assert.deepEqual(body.stops[0].attendance, 1000);
            });
    });

    it('removes a stop that got cancelled', () => {
        
        const downtown = {
            location: {
                city: 'St Louis',
                state: 'MO',
                zip: 63010
            },
            weather: {
                temperature: '83 F',
                condition: 'Sunny'
            },
            attendance: 200
        };

        return addStop(universoul, downtown)
            .then(stop => {
                return request
                    .delete(`/api/tours/${universoul._id}/stops/${stop._id}`);
            })
            .then(checkOk)
            .then(() => {
                return request.get(`/api/tours/${universoul._id}`);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.stops.length, 1);

            });
    });
    
});
