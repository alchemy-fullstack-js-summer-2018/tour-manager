const { assert } = require('chai');

function createMiddleware(api) {
    return (req, res, next) => {
        return api(req.body.zip)
            .then(({ location, weather }) => {
                req.body.location = location;
                req.body.weather = weather;
                next();
            });
    };
}

it('finds city, state, and weather for a zip', done => {
    const weather = { 
        temperature: 82,
        condition: 'cloudy'
    };
    const location = {
        city: 'Honolulu',
        state: 'HI',
        zip: '96813'
    };

    const wunderground = zip => {
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

    const middleware = createMiddleware(wunderground);
    middleware(req, null, next);

});
