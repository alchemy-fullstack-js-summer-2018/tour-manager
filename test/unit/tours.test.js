const chai = require('chai');
const { assert } = chai;
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {

    it('validates good model', () => {
        const data = {
            title: {
                type: 'P.T. Barnum\'s Circus at London',
            },
            activities: ['tightrope', 'trapeze', 'lion tamer'],
            launchDate: {
                type: 'July 18th, 2018',
            },
            stops: [
                {
                    location: {
                        city: 'London',
                        state: 'California',
                        zip: 92115
                    },
                    weather: {
                        temperature: 76,
                        condition: 'sunny'
                    },
                    attendance: 100
                },
                {
                    location: {
                        city: 'San Diego',
                        state: 'California',
                        zip: 92115
                    },
                    weather: {
                        temperature: 75,
                        condition: 'sunny'
                    },
                    attendance: 400
                }
            ]
        };
        const tour = new Tour(data);

        const json = tour.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

});