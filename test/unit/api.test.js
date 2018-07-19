const { assert } = require('chai');

function createMiddleware(api) {
    return (req, res, next) => {
        api(req.body.zip)
            .then(data => {
                req.body = data;
                next();
            });
    };
}

const weather = {
    temperature: 80,
    condition: 'Windy'
};

const location = {
    city: 'Portland',
    state: 'OR',
    zip: '97205'
};

const req = {
    body: {
        zip: '97205'
    }
};

describe.only('weather API', () => {
    it('handles async', done => {

        const api = zip => {
            assert.equal(zip, '97205');
            return Promise.resolve({
                weather, location
            });
        };

        const next = () => {
            assert.equal(req.body.weather, weather);
            assert.equal(req.body.location, location);
            done();
        };
        
        const middleware = createMiddleware(api);
        middleware(req, null, next);
    });
});