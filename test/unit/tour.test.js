const { assert } = require('chai');
//const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {

    it('validates the data model', () => {
        const data = {
            title: 'Circus Walrus 2018 Tour',
            activities: ['trained walruses', 'tightrope walkers', 'fire eaters', 'clowns'],
            launchDate: new Date(2018, 7, 18),
            stops: [
                {
                    location: {
                        city: 'Black Betsy',
                        state: 'WV',
                        zip: 25159
                    },
                    weather: {
                        temperature: 80,
                        conditions: 'sunny and humid'
                    },
                    attendance: 400
                }, {
                    location: {
                        city: 'Big Ugly Creek',
                        state: 'WV',
                        zip: 25524
                    },
                    weather: {
                        temperature: 84,
                        conditions: 'sunny and hot'
                    },
                    attendance: 310
                }]
        };

        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });
});