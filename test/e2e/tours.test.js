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
    beforeEach(() => {
        return save({ title: 'Tour2' })
            .then(data => {
                tour2 = data;
            });
    });

    it('saves a tour', () => {
        assert.isOk(tour2._id);
    });

    it('gets all tours', () => {
        let tour3;
        return save({ title: 'Tour3' })
            .then(_tour3 => {
                tour3 = _tour3;
                return request.get('/api/tours');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [tour2, tour3]);
            });
    });
        
    it('gets a tour by id', () => {
        return request
            .get(`/api/tours/${tour2._id}`)
            .then(({ body }) => {
                console.log('*****', body);
                assert.deepEqual(body, tour2);
            });
    });
        
    it('updates a tour with attendance', () => {
        tour2.stops.attendance = 500;
        return request
            .put(`/api/tours/${tour2._id}`)
            .send(tour2)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, tour2);
            });
    });

    

});

 