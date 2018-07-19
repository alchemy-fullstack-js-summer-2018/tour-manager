const { assert } = require('chai');
const weatherService = require('../../lib/util/weather-service');


it('gets the city, state, weather and conditions for a tour stop', done => {
    const weather = {
        temperature: 80,
        condition: 'hot'
    };
    const location = {
        city: 'Lick Fork',
        state: 'WV',    
        zip: '25276'
    };

    const wunderground = zip => {
        assert.equal(zip, '25276');
        return Promise.resolve({
            weather, location
        });
    };

    const req = {
        body: { zip: '25276' }
    };

    const next = () => {
        assert.deepEqual(req.body.location, 'location info missing');
        assert.deepEqual(req.body.weather, 'weather info missing');
        done();

    };

    const middleware = weatherService(wunderground);
    middleware(req, null, next);
});