const { assert } = require('chai');
const Tour = require('../../lib/models/tour');
const { getErrors } = require('./helpers');

describe('Circus Tour API', () => {

    it('validates a good model', () => {
        const data = {
            title: 'Flying Monkeys',
            activities: ['Monkeys playing instruments and such'],
            launchDate: new Date(2018, 8, 22),
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'Oregon',
                    zip: 94770
                },
                weather: {
                    temperature: 80,
                    condition: 'Summertime heat'
                },
                attendance: 20
            }]
        };

        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);

    });

    it('validates that a title is required', () => {
        const tour = new Tour({});
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('provides a default value if date is not specified', () => {
        const date = new Date().getDate();
        const tour = new Tour({ title: 'Whiskey Pirates' });
        assert.equal(tour.launchDate.getDate(), date);
    });

    it('validates attendance is no less than 1', () => {
        const tour = new Tour({
            title: 'Raining bunnies',
            stops: { attendance: 0 }
        });
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});

