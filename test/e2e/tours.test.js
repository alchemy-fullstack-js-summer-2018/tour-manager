const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected http 200 status code');
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
    let tourA;
    let tourB;
    beforeEach(() => {
        return save({ title: 'The Amazing ULTRA Tour!',
            activities: ['fire breathing', 'chimpanzees', 'creepy clowns'],
            launchDate: new Date(),
            stops: [
                {
                    location: {
                        city: 'Portland',
                        state: 'Oregon',
                        zip: 97209
                    },
                    weather: {
                        temperature: 75,
                        condition: 'Windy'
                    },
                    attendance: 5000
                },
                {
                    location: {
                        city: 'Seattle',
                        state: 'Washington',
                        zip: 98101
                    },
                    weather: {
                        temperature: 81,
                        condition: 'Mild'
                    },
                    attendance: 7500
                },
                {
                    location: {
                        city: 'Boise',
                        state: 'Idaho',
                        zip: 83701
                    },
                    weather: {
                        temperature: 55,
                        condition: 'Chilly'
                    }
                },
            ] })
            .then(data => {
                tourA = data;
            });
    });
    beforeEach(() => {
        return save({ title: 'The Incredible Fantastical Tour!',
            activities: ['sword swallowers', 'murder', 'trapeze artists'],
            launchDate: new Date(),
            stops: [
                {
                    location: {
                        city: 'New York City',
                        state: 'New York',
                        zip: 10001
                    },
                    weather: {
                        temperature: 95,
                        condition: 'Clear'
                    },
                    attendance: 12000
                },
                {
                    location: {
                        city: 'Philadelphia',
                        state: 'Pennsylvania',
                        zip: 19019
                    },
                    weather: {
                        temperature: 84,
                        condition: 'Sunny'
                    },
                    attendance: 9500
                },
                {
                    location: {
                        city: 'Newark',
                        state: 'NJ',
                        zip: 17101
                    },
                    weather: {
                        temperature: 62,
                        condition: 'Cloudy'
                    },
                    attendance: 1500
                },
            ] })
            .then(data => {
                tourB = data;
            });
    });
    
    // it.only('updates the attendance of a stop', () => {
    //     let stop = {};
    //     stop.attendance = '1000';
    //     return request
    //         .post(`/api/tours/${tourA._id}/stops/${tourA.stops[0]._id}/attendance`)
    //         .send(stop.attendance)
    //         .then(checkOk)
    //         .then(({ body }) => {
    //             console.log('****CONSOLE****', body);
    //             assert.deepEqual(body.stops[0].attendance, stop.attendance);
    //         });
    // });
    
    it('saves a tour', () => {
        assert.isOk(tourA._id);
        assert.isOk(tourB._id);
    });
    
    it('gets all tours', () => {
        return request
            .get('/api/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [tourA, tourB]);
            });
    });

    it('gets one tour by id', () => {
        return request
            .get(`/api/tours/${tourA._id}`)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, tourA);
            });
    });

    function addStop(tour, stop) {
        return request
            .post(`/api/tours/${tourA._id}/stops`)
            .send(stop)
            .then(checkOk)
            .then(({ body }) => body);
    }

    it('adds a stop to a tour', () => {
        const stop = {
            location: {
                city: 'Austin',
                state: 'Texas',
                zip: 33039
            },
            weather: {
                temperature: 100,
                condition: 'Heat Warning'
            },
            attendance: 9500
        };
        return addStop(tourA, stop)
            .then(_stop => {
                assert.isDefined(_stop._id);
                assert.equal(_stop.attendance, stop.attendance);
            });
    });

    it('deletes a stop from the tour', () => {
        const newStop = {
            location: {
                city: 'Austin',
                state: 'Texas',
                zip: 33039
            },
            weather: {
                temperature: 100,
                condition: 'Heat Warning'
            },
            attendance: 9500
        };

        return addStop(tourA, newStop)
            .then(stop => {
                return request
                    .delete(`/api/tours/${tourA._id}/stops/${stop._id}`);
            })
            .then(checkOk)
            .then(() => {
                return request.get(`/api/tours/${tourA._id}`);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.stops.length, 3);
            });
    });

});