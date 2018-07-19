const { assert } = require('chai');
const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {

    it('validates good model', () => {
        const data = {
            title: 'Tables & Chairs',
            activities: ['pony rides', 'dancing bears', 'band', 'snacks'],
            launchDate: new Date(2019, 2, 18),
            stops: [
                {
                    location: {
                        city: 'Honolulu',
                        state: 'HI',
                        zip: '96813'
                    },
                    weather: {
                        temperature: '80.4 F (26.9 C)',
                        condition: 'Cloudy'
                    },
                    attendance: 1800
                },
                {
                    location: {
                        city: 'Portland',
                        state: 'OR',
                        zip: '97212'
                    },
                    weather: {
                        temperature: '92 F',
                        condition: 'Sunny'
                    },
                    attendance: 600
                }
            ]
        };

        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

    it('validates title is required', () => {
        const tour = new Tour({});
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('validates default launch date is now', () => {
        const now = new Date();
        const tour = new Tour({
            title: 'Spoobombing Hackey Stoppers'
        });
        const launchDate = tour.toJSON().launchDate;
        assert.isAtLeast(launchDate, now);
    });

    it('validates attendance for stops is minimum of 1', () => {
        const tour = new Tour({
            title: 'Spoobombing Hackey Stoppers',
            stops: [{ attendance: -1 }]
        });
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });    
});