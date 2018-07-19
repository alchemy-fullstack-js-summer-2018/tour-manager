const { assert } = require('chai');
const { createMiddleware } = require('../../lib/utils/middleware');

describe.only('Middleware tests', () => {

    it.only('handles async', done => {
        const weather = {
            temperature: '',
            condition: ''
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
            //make assertions
            //test that req.body has weather and location
            assert.deepEqual(req.body, { weather, location });

            done();
        };

        const req = {
            query: {
                zip: '92115'
            },
            body: {
                weather: {
                    temperature: '',
                    condition: ''
                },
                location: {
                    city: 'San Diego',
                    state: 'California',
                }
            }
        };

        middleware(req, null, next);
    });

    it('takes a zip when a stop is added', () => {

    });
});