const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const getLocationWeather = require('../../lib/util/weather-service');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
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

    
    let cirque1;
    let cirque2;
    let circuses = [];
    
    beforeEach(() => {
        return save({
            title: 'Love',
            activities: ['singing, dancing'],
            lunchDate: new Date(),
            stops: [{
                location: {
                    city: 'Las Vegas',
                    state: 'Nevada',
                    zip: '89109'
                },
                weather: {
                    temperature: '99',
                    condition: 'dry heat'
                },
                attendance: 2000
            }]
        })
            .then(data => {
                cirque1 = data;
                circuses[0] = cirque1;
            });
    });
                
    beforeEach(() => {
        return save({
            title: 'Zumanity',
            activities: ['contortion, sexy stuff'],
            lunchDate: new Date(),
            stops: [{
                location: {
                    city: 'Las Vegas',
                    state: 'Nevada',
                    zip: '89109'
                },
                weather: {
                    temperature: '102',
                    condition: 'hell fire'
                },
                attendance: 1800
            }]
        })
            .then(data => {
                cirque2 = data;
                circuses[1] = cirque2;
            });
    });
                
    it('saves a tour', () => {
        assert.isOk(cirque1._id);
        assert.isOk(cirque2._id);
    });
    
    it('gets a tour by id', () => {
        return request
            .get(`/api/tours/${cirque1._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, cirque1);
            });
    });
                
    it('gets all tours', () => {
        return request
            .get('/api/tours')
            .then(({ body }) => {
                assert.deepEqual(body, circuses);
            });
    });

    it('get weather info', () => {
        return getLocationWeather('89109')
            .then(data => {
                console.log(data);
                assert.isDefined(data);
            });
    });
                
    it('updates a tour', () => {
        cirque1.title = 'The Beatles: Love';
        return request
            .put(`/api/tours/${cirque1._id}`)
            .send(cirque1)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body.title, 'The Beatles: Love');
            });
    });
                
    it('cancels a tour, no money back', () => {
        return request
            .delete(`/api/tours/${cirque2._id}`)
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.removed, true);
                return request
                    .get('/api/tours');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [cirque1]);
            });
    });
                
    function addStop(tour, stop) {
        return request
            .post(`/api/tours/${tour._id}/stops`)
            .send(stop)
            .then(checkOk)
            .then(({ body }) => body);
    }

    it('adds stop to tour', () => {
        const data = {
            location: {
                city: 'Portland',
                state: 'Oregon',
                zip: '97209'
            },
            weather: {
                temperature: '75',
                condition: 'cloudy'
            },
            attendance: 13
        };

        return addStop(cirque1, data)
            .then(stop =>  {
                assert.isDefined(stop._id);
                assert.deepEqual(stop.location, data.location);
            })
            .then(() => {
                return request.get(`/api/tours/${cirque1._id}`)
                    .then(checkOk)
                    .then(({ body }) => {
                        assert.equal(body.stops.length, 2);
                    });
            });
        
    });

    it('removes a stop from tour', () => {
        const data = {
            location: {
                city: 'Portland',
                state: 'Oregon',
                zip: '97209'
            },
            weather: {
                temperature: '75',
                condition: 'cloudy'
            },
            attendance: 13
        };

        return addStop(cirque1, data)
            .then(stop => {
                return request
                    .delete(`/api/tours/${cirque1._id}/stops/${stop._id}`);
            })
            .then(checkOk)
            .then(() => {
                return request.get(`/api/tours/${cirque1._id}`);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.stops.length, 1);
            });
    });

    it('updates attendance', () => {
        const data = { attendance: 26 };
        return request
            .put(`/api/tours/${cirque1._id}/stops/${cirque1.stops[0]._id}/attendance`)
            .send(data)
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.stops[0].attendance, 26);
            });
    });
});