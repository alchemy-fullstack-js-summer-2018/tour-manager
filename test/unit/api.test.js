const { assert } = require('chai');

function createLocationWeather(api) {
    return (req, res, next) => {
        return api(req.body.zip)
            .then(data => {
                req.body = data;
                next();
            });
    };
}

it('test function that finds weather for a zip', done => {
    const weather = {
        temperature: '80 F',
        sunset: '7:30pm'
    };
    const location = {
        city: 'Portland',
        state: 'OR',
        zip: '97203'
    };

    const getLocationWeather = zip => {
        assert.equal(zip, '97203');
        return Promise.resolve({
            weather, location
        });
    };

    const req = {
        body: { zip: '97203' }
    };

    const next = () => {
        assert.deepEqual(req.body.location, location, 'location missing');
        assert.deepEqual(req.body.weather, weather, 'weather missing');
        done();
    };

    const getLocation = createLocationWeather(getLocationWeather);
    getLocation(req, null, next);
});