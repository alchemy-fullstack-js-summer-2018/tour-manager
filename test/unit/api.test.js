const { assert } = require('chai');


describe('the weather API', () => {
    function createMiddleware(api) {
        return (req, res, next) => {
            req.body = api(req.body.zip);
            // console.log('**DATA**', data);
            console.log('**REQ**', req);
            // console.log('**RES**', res);
            // console.log('**NEXT**', next);
    
            next();
        };
    }
    it('gets the location and weather info for a given zip', done => {

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
    
        
        const next = () => {
            console.log('**IN NEXT**', req.body);
            assert.deepEqual(weather, req);
            done();
        };
        const middleware = createMiddleware(api);
        
        const req = {
            body: {
                zip: '97205'
            }
        };
    
        middleware(req, null, next);
    
        // console.log('***LOWER MOST CONSOLE***', req.body);
        // assert.deepEqual(weather, req.body);
    });
});