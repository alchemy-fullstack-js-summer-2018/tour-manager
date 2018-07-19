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

it('gets the city, state, weather and conditions for a tour stop', () => {
    const weather ={
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

    const middleware = createMiddleware(wunderground);
    middleware(req, null, next);
});