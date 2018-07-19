const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Circus Tours API', () => {
    beforeEach(() => dropCollection('tours'));
    let soleilTour;
    let ringlingTour;
    let barnumTour;

    const soleil = {
        title: 'Cirque du Soleil',
        activities: ['flying', 'climbing'],
        stops: [
            {
                attendance: 5
            }
        ]
    };
    const ringling = {
        title: 'Ringling Bros',
        activities: ['hopping', 'juggling'],
        stops: [
            {
                attendance: 12
            }
        ]
    };
    const barnum = {
        title: 'P.T. Barnum',
        activities: ['clowns', 'more clowns']
    };

    beforeEach(() => {
        return request
            .post('/api/tours')
            .send(soleil)
            .then(({ body }) => soleilTour = body);
    });
    beforeEach(() => {
        return request
            .post('/api/tours')
            .send(ringling)
            .then(({ body }) => ringlingTour = body);
    });
    beforeEach(() => {
        return request
            .post('/api/tours')
            .send(barnum)
            .then(({ body }) => barnumTour = body);
    });

    it('saves a tour', () => {
        assert.isOk(soleilTour._id);
    });

    it('gets all tours', () => {
        return request
            .get('/api/tours')
            .then(({ body }) => {
                assert.deepEqual(body, [soleilTour, ringlingTour, barnumTour]);
            });
    });

    it('gets a tour by ID', () => {
        return request
            .get(`/api/tours/${ringlingTour._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, ringlingTour);
            });
    });

    it('updates a tour by ID', () => {
        ringlingTour.stops[0].attendance = 80;
        return request
            .put(`/api/tours/${ringlingTour._id}`)
            .send(ringlingTour)
            .then(({ body }) => {
                assert.deepEqual(body.stops[0].attendance, ringlingTour.stops[0].attendance);
            });
    });

    it('removes a tour by ID', () => {
        return request
            .delete(`/api/tours/${soleilTour._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, { removed: true });
                return request.get('/api/tours');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [ringlingTour, barnumTour]);
            });
    });

    it('returns false when attempting to remove non-existent tour', () => {
        return request
            .delete('/api/tours/5b4f8461ac58b3b0ad992dad')
            .then(({ body }) => {
                assert.deepEqual(body, { removed: false });
            });
    });

    it('sends a 404 error on bad path', () => {
        return request
            .get('/bad/path')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('adds a stop to a tour', () => {
        const stop = {
            attendance: 30
        };

        return request
            .post(`/api/tours/${barnumTour._id}/stops`)
            .send(stop)
            .then(({ body }) => {
                assert.equal(body.attendance, stop.attendance);
            });
    });

    it('removes a stop from a tour', () => {
        const stop = {
            attendance: 30
        };

        return request
            .post(`/api/tours/${barnumTour._id}/stops`)
            .send(stop)
            .then(stop => {
                return request
                    .delete(`/api/tours/${barnumTour._id}/stops/${stop.body._id}`);
            })
            .then(() => {
                return request.get(`/api/tours/${barnumTour._id}`);
            })
            .then(({ body }) => {
                assert.equal(body.stops.length, 0);
            });
    });
});