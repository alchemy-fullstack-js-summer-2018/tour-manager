const { assert } = require('chai');

function createMiddleware(api) {
    return (req, res, next) => {
        const data = api(req.body.zip);
        console.log(data);
        next();
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

    const api = zip => {
        assert.equal(zip, '96813');
        return Promise.resolve({
            weather, location
        });
    };

    const middleware = createMiddleware(api);

    const next = () => {
        
        done();
    };

    const req = {
        body: {
            zip: '96813'
        }
    };

    middleware(req, null, next);

});
