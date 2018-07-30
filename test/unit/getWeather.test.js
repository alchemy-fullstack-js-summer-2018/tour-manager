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

it('test function tha finds weather for a zip', done => {
    const weather = {
        temperature: '78 F',
        condition: 'Sunny'
    };
    const location = {
        city: 'St Louis',
        state: 'MO',
        zip: '63034'
    };

    const getLocationWeather = zip => {
        assert.equal(zip, '63034');
        return Promise.resolve({
            weather, location
        });
    };

    const req = {
        body: { zip: '63034' }
    };

    const next = () => {
        assert.deepEqual(req.body.location, location, 'location missing');
        assert.deepEqual(req.body.weather, weather, 'weather missing');
        done();
    };

    const getLocation = createLocationWeather(getLocationWeather);
    getLocation(req, null, next);
});