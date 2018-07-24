const { assert } = require('chai');
const { createMiddleware } = require('../../lib/utils/middleware');

describe('Middleware tests', () => {

    it('handles async', done => {
        const weather = {
            temperature: '76',
            condition: 'sunny'
        };
        const location = {
            city: 'San Diego',
            state: 'California'
        };

        const api = zip => {
            assert.equal(zip, '92115');
            return Promise.resolve({
                weather, location
            });
        };

        const middleware = createMiddleware(api);

        const next = () => {
            assert.deepEqual(req.body, { weather, location });
            done();
        };

        const req = {
            query: {
                zip: '92115'
            }
        };

        middleware(req, null, next);
    });
});