const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected Error 200');
    return res;
};

describe('Tours tests', () => {
    beforeEach(() => dropCollection('tours'));
    
    //defining data sets for tests
    let circusWalrus;
    let walrusWorld;

    const circusWalrusData = {
        title: 'Circus Walrus 2018 Tour',
        activities: ['trained walruses', 'fire eaters'],
        launchDate: new Date(2018, 7, 18),
        stops: [
            {
                location: {
                    city: 'Black Betsy',
                    state: 'WV',
                    zip: 25159
                },
                weather: {
                    temperature: 80,
                    conditions: 'sunny and humid'
                },
                attendance: 400
            }, {
                location: {
                    city: 'Big Ugly Creek',
                    state: 'WV',
                    zip: 25524
                },
                weather: {
                    temperature: 84,
                    conditions: 'sunny and hot'
                },
                attendance: 310
            }]
    };

    beforeEach(() => {
        
        return request 
            .post('/api/tours')
            .send(circusWalrusData)
            .then(checkOk)
            .then(({ body }) => circusWalrus = body);
    });

    const walrusWorldData = {
        title: 'Wonderful World of Walruses 2018',
        activities: ['trained walruses', 'fire eaters', 'Clam eating contest'],
        launchDate: new Date(2018, 7, 18),
        stops: [
            {
                location: {
                    city: 'Burnt Corn',
                    state: 'AL',
                    zip: 36401
                },
                weather: {
                    temperature: 88,
                    conditions: 'cloudy and humid'
                },
                attendance: 292
            }, {
                location: {
                    city: 'Blue Eye',
                    state: 'AL',
                    zip: 35096
                },
                weather: {
                    temperature: 84,
                    conditions: 'sunny and hot'
                },
                attendance: 501
            }]
    };

    beforeEach(() => {
        
        return request 
            .post('/api/tours')
            .send(walrusWorldData)
            .then(checkOk)
            .then(({ body }) => walrusWorld = body);
    });
    

    it('returns ALL tours', () => {
        return request
            .get('/api/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body[0].title, circusWalrus.title);
                assert.deepEqual(body[1].title, walrusWorld.title);
            });
    });

    it('GET tour by Id', () => {
        return request
            .get(`/api/tours/${walrusWorld._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, walrusWorld);
            });
    });

    it('saves a tour', () => {
        assert.isOk(walrusWorld._id);
    });

    it('deletes a tour', () => {
        return request
            .del(`/api/tours/${circusWalrus._id}`)
            .then(checkOk)
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get('/api/tours');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [walrusWorld]);
            });
    });

    function addStop(tour, stop) {
        return request
            .post(`/api/tours/${tour._id}/stops`)
            .send(stop)
            .then(checkOk)
            .then(({ body }) => body);
    }
    
    it('adds a stop to a tour', () => {
        const stp = {
            location: {
                city: 'Goochland',
                state: 'VA',
                zip: 23063
            },
            weather: {
                temperature: 78,
                condition: 'partly cloudy'
            },
            attendance: 342
        };

        return addStop(walrusWorld, stp)
            .then(stop => {
                assert.isDefined(stop._id);
                assert.equal(stop.attendance, stp.attendance);
            });

    });

    it('deletes a stop from a tour', () => {
        const stp = {
            location: {
                city: 'Goochland',
                state: 'VA',
                zip: 23063
            },
            weather: {
                temperature: 78,
                condition: 'partly cloudy'
            },
            attendance: 342
        };

        return addStop(walrusWorld, stp)
            .then(stop => {
                return request
                    .delete(`/api/tours/${walrusWorld._id}/stops/${stop._id}`);
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.stops.length, 2);
            });

    });

    it('updates attendance numbers for a tour stop', () => {
        const stop = {
            attendance: 700
        };
        return request
            .put(`/api/tours/${walrusWorld._id}/stops/${walrusWorld.stops[0]._id}/attendance`)
            .send(stop)
            .then(({ body }) => {
                assert.equal(body.stops[0].attendance, stop.attendance);
            });
    });
    

    

});
