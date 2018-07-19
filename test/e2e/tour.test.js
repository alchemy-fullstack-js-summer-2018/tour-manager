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

    let cirqueDuSoleil_1;
    let cirqueDuSoleil_2;
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
                    zip: 89109
                },
                weather: {
                    temperature: 99,
                    condition: 'dry heat'
                },
                attendance: 2000
            }]
        })
            .then(data => {
                cirqueDuSoleil_1 = data;
                circuses[0] = cirqueDuSoleil_1;
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
                    zip: 89109
                },
                weather: {
                    temperature: 102,
                    condition: 'hell fire'
                },
                attendance: 1800
            }]
        })
            .then(data => {
                cirqueDuSoleil_2 = data;
                circuses[1] = cirqueDuSoleil_2;
            });
    });

    it('saves a tour', () => {
        assert.isOk(cirqueDuSoleil_1._id);
    });
    it('saves another tour', () => {
        assert.isOk(cirqueDuSoleil_2._id);
    });
});