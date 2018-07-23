const { assert } = require('chai');
const getLocationWeather = require('../../lib/utils/weather-data');

describe('Wunderground API', () => {

    it.skip('calls to Wunderground API successful', () => {
        return getLocationWeather('92111')
            .then(data => {
                assert.isOk(data);
            })
    });
});