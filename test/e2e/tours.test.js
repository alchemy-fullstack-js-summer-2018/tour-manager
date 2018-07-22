const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe.only('Tours API', () => {

    beforeEach(() => dropCollection('tours'));

    let barnum;
    let beatles;

    const barnumData = {
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
            .send(barnumData)
            .then(({ body }) => barnum = body);
    });

    const beatlesData = {
        title: 'Magical Mystery Tour',
        activities: ['trampoline', 'lion tamer', 'kite flying'],
        launchDate: new Date(2018, 8, 19),
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
                    city: 'Portland',
                    state: 'Oregon',
                    zip: 92709
                },
                weather: {
                    temperature: 66,
                    condition: 'rainy'
                },
                attendance: 40000
            }
        ]
    };

    beforeEach(() => {
        return request  
            .post('/api/tours')
            .send(beatlesData)
            .then(({ body }) => beatles = body);
    });

    it('saves a tour', () => {
        assert.isOk(barnum._id);
    });

    it('returns a tour by id on GET', () => {
        return request
            .get(`/api/tours/${barnum._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, barnum);
            });
    });

    it('returns list of tours on GET', () => {
        return request
            .get('/api/tours')
            .then(({ body }) => {
                assert.deepEqual(body[0].title, barnum.title);
                assert.deepEqual(body[1].title, beatles.title);
            });
    });

    it('updates a tour on PUT', () => {
        beatles.title = 'For the Benefit of Mr.Kite';
        return request
            .put(`/api/tours/${beatles._id}`)
            .send(beatles)
            .then(({ body }) => {
                assert.deepEqual(body, beatles);
            });
    });

    it('removes a tour on DELETE', () => {
        return request
            .del(`/api/tours/${barnum._id}`)
            .then(checkOk)
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get('/api/tours');
            })
            .then(checkOk)
            .then(({ body }) => {
                beatles = {
                    _id: beatles._id,
                    title: beatles.title
                };
                assert.deepEqual(body, [beatles]);
            });
    });

    function addStop(tour, stop) {
        return request
            .post(`/api/tours/${tour._id}/stops`)
            .send(stop)
            .then(checkOk)
            .then(({ body }) => body);
    }

    it.only('adds a stop to a tour on POST', () => {
        const lhr = {
            location: {
                city: 'London',
                state: 'England',
                zip: 92115
            },
            weather: {
                temperature: 76,
                condition: 'sunny'
            },
            attendance: 1000
        };
        
        return addStop(beatles, lhr) 
            .then(stop => {
                assert.isDefined(stop._id);
                assert.equal(stop.attendance, lhr.attendance);
            });
    });
});