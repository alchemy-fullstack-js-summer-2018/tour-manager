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
describe('the weather API', () => {
    it('gets the location and weather info for a given zip', done => {
        const location = {
            city: 'Portland',
            state: 'Oregon'
        };
        const weather = {
            temperature: 83,
            condition: 'Windy'
        };
        
        const req = {
            body: {
                zip: '97205'
            }
        };
    
        const api = zip => {
            assert.equal(zip, '97205');
            return Promise.resolve({
                weather, location
            });
        };
    
        
        const next = () => {
            assert.deepEqual(weather, req.body.weather);
            assert.deepEqual(location, req.body.location);
            done();
        };

        const middleware = createMiddleware(api);
        middleware(req, null, next);
    
    });
});