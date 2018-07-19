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
                assert.equal(body[0].title, soleilTour.title);
                assert.equal(body[1].title, ringlingTour.title);
                assert.equal(body[2].title, barnumTour.title);
                assert.deepEqual(body[0].activities, soleilTour.activities);
                assert.deepEqual(body[1].activities, ringlingTour.activities);
                assert.deepEqual(body[2].activities, barnumTour.activities);
            });
    });

    it('gets a tour by ID', () => {
        return request
            .get(`/api/tours/${ringlingTour._id}`)
            .then(({ body }) => {
                assert.deepEqual(body.activities, ringlingTour.activities);
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
                assert.equal(body[0].title, ringlingTour.title);
                assert.equal(body[1].title, barnumTour.title);
                assert.deepEqual(body[0].activities, ringlingTour.activities);
                assert.deepEqual(body[1].activities, barnumTour.activities);
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

});