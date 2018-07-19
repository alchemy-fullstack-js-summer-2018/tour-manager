const { assert } = require('chai');

function createMiddleware(api) {
    return (req, res, next) => {
        const data = api(req.body.zip);
        console.log('**API**', api);
        console.log('**REQ**', req);
        console.log('**RES**', res);
        console.log('**NEXT**', next);
        next();
    };
}

describe('the weather API', done => {
    const location = {
        city: 'Portland',
        state: 'Oregon'
    };
    const weather = {
        temperature: 83,
        condition: 'Windy'
    };

    const api = zip => {
        assert.equal(zip, '97205');
        return Promise.resolve({
            weather, location
        });
    };

    const middleware = createMiddleware(api);

    const next = () => {
        assert.deepEqual(weather, data);
        done();
    };

    const req = {
        body: {
            zip: '97205'
        }
    };

    middleware(req, null, next);
});