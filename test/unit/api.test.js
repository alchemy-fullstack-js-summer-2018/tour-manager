const { assert } = require('chai');
// const createLocationWeather = require('../../lib/util/create-location');

function createLocationWeather(api) {
    return (req, res, next) => {
        return api(req.body.zip)
            .then(data => {
                req.body = data;
                next();
            });
    };
    
}


it('finds city, state, and weather for a zip', done => {
    const weather = { 
        temperature: '80.4 F (26.9 C)',
        condition: 'Cloudy'
    };
    const location = {
        city: 'Honolulu',
        state: 'HI',
        zip: '96813'
    };

    const getLocationWeather = zip => {
        assert.equal(zip, '96813');
        return Promise.resolve({
            weather, location
        });
    };

    const req = {
        body: { zip: '96813' }
    };

    const next = () => {
        assert.deepEqual(req.body.location, location, 'location missing');
        assert.deepEqual(req.body.weather, weather, 'weather missing');
        done();
    };

    const getLocation = createLocationWeather(getLocationWeather);
    getLocation(req, null, next);
});
