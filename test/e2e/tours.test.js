const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe.only('Tours API', () => {

    beforeEach(() => dropCollection('tours'));

    let tour;

    const data = {
        title: 'P.T. Barnum\'s Circus at London',
        activities: ['tightrope', 'trapeze', 'lion tamer'],
        launchDate: new Date(2018, 7, 18),
        stops: [
            {
                location: {
                    city: 'London',
                    state: 'California',
                    zip: 92115
                },
                weather: {
                    temperature: 76,
                    condition: 'sunny'
                },
                attendance: 100
            },
            {
                location: {
                    city: 'San Diego',
                    state: 'California',
                    zip: 92115
                },
                weather: {
                    temperature: 75,
                    condition: 'sunny'
                },
                attendance: 400
            }
        ]
    };

    beforeEach(() => {
        return request  
            .post('/api/tours')
            .send(data)
            .then(({ body }) => tour = body);
    });

    it('saves a tour', () => {
        assert.isOk(tour._id);
    });

    it('returns a tour by id on GET', () => {
        return request
            .get(`/api/tours/${tour._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, tour);
            });
    });

    it('returns list of tours on GET', () => {
        return request
            .get('/api/tours')
            .then(({ body }) => {
                assert.deepEqual(body[0].title, tour.title);
            });
    });

    it('updates a tour on PUT', () => {
        tour.title = 'For the Benefit of Mr.Kite';
        return request
            .put(`/api/tours/${tour._id}`)
            .send(tour)
            .then(({ body }) => {
                assert.deepEqual(body, tour);
            });
    });

    it('removes a tour on DELETE', () => {
        return request
            .del(`/api/tours/${tour._id}`)
            .then(checkOk)
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get('/api/tours');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    // function addStop(tour, stop) {
    //     return request
    //         .post(`/api/tours/${tour._id}/stops`)
    //         .send(stop)
    //         .then(checkOk)
    //         .then(({ body }) => body);
    // }

    // it.skip('adds a stop to a tour on POST', () => {
    //     const lhr = {
    //         location: {
    //             city: 'London',
    //             state: 'California',
    //             zip: 92115
    //         },
    //         weather: {
    //             temperature: 76,
    //             condition: 'sunny'
    //         },
    //         attendance: 1000
    //     };

    //     return addStop(tour, lhr) 
    //         .then(stop => {
    //             assert.isDefined(stop._id);
    //             assert.equal(stop.location, lhr.location);
    //         });
    // });
});