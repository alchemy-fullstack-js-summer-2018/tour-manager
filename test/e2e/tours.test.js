const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');



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

    let tour2;
    let tour3;
    beforeEach(() => {
        return save({ title: 'Amazers', 
            activities: ['trapeze', 'lions', 'clowns'],
            launchDate: new Date(),
            stops: [
                {
                    location: {
                        city: 'Portland',
                        state: 'OR',
                        zip: 97203
                    },
                    weather: {
                        temperature: 80,
                    },
                    attendance: 1000
                },   
                {
                    location: {
                        city: 'Eugene',
                        state: 'OR',
                        zip: 97401
                    },
                    weather: {
                        temperature: 80,
                    }
                },   
            ] })
            .then(data => {
                tour2 = data;
            });   
    });
    beforeEach(() => {
        return save({ title: 'Fantastical', 
            activities: ['trapeze', 'lions', 'clowns'],
            launchDate: new Date(),
            stops: [
                {
                    location: {
                        city: 'Seattle',
                        state: 'WA',
                        zip: 98118
                    },
                    weather: {
                        temperature: 90,
                    },
                    attendance: 1200
                },   
                {
                    location: {
                        city: 'Olympia',
                        state: 'WA',
                        zip: 98501
                    },
                    weather: {
                        temperature: 85
                    },
                    attendance: 600
                },   
            ] })
            .then(data => {
                tour3 = data;
            });   
    });

    it('saves a tour', () => {
        assert.isOk(tour2._id);
        assert.isOk(tour3._id);
    });

    it('gets all tours', () => {
        return request 
            .get('/api/tours') 
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [tour2, tour3]);
            });       
    });
        
    it('gets a tour by id', () => {
        return request
            .get(`/api/tours/${tour2._id}`)
            .then(({ body }) => {
                // console.log('*****', body);
                assert.deepEqual(body, tour2);
            });
    });
    
    // Stops
    function addStop(tour, stop) {
        return request
            .post(`/api/tours/${tour2._id}/stops`)
            .send(stop)
            .then(checkOk)
            .then(({ body }) => body);
    }
    it('adds a stop to the tour', () => {
        const stop = {
            location: {
                city: 'Tacoma',
                state: 'WA',
                zip: 98407
            },
            weather: {
                temperature: 85,
            },
        };
        return addStop(tour2, stop)
            .then(_stop => {
                assert.isDefined(_stop._id);
                assert.equal(_stop.attendance, stop.attendance);
            });
    });
    it('deletes a stop from a tour', () => {
        const newStop = {
            location: {
                city: 'Tacoma',
                state: 'WA',
                zip: 98407
            },
            weather: {
                temperature: 85,
            }
        };

        return addStop(tour2, newStop)
            .then(stop => {
                return request
                    .delete(`/api/tours/${tour2._id}/stops/${stop._id}`);
            })
            .then(checkOk)
            .then(() => {
                return request.get(`/api/tours/${tour2._id}`);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.stops.length, 2);
            });

    });
    // updating attendance   
    // it('updates a tour with attendance', () => {
    //     const data = { attendance: 500 };
    //     return request
    //         .put('/api/tours/stops.attendance')
    //         .send(data)
    //         .then(checkOk)
    //         .then(({ body }) => {
    //             assert.deepEqual(body.stops[0].attendance, 500);
    //         });
    // });
    
    

});

 