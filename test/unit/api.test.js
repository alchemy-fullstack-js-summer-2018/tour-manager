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

it('gets city, state and weather from zip', done => {
    const weather = {
        temperature: '90.2 F',
        condition: 'Sunny'
    };
    const location = {
        city: 'Portland',
        state: 'Oregon',
        zip: '97209'
    };

    const getLocationWeather = zip => {
        assert.equal(zip, '97209');
        return Promise.resolve({
            weather, location
        });
    };

    const req = {
        body: { zip: '97209' }
    };

    const next = () => {
        assert.deepEqual(req.body.location, location, 'local missing');
        assert.deepEqual(req.body.weather, weather, 'weather missing');
        done();
    };

    const getLocation = createLocationWeather(getLocationWeather);
    getLocation(req, null, next);
});