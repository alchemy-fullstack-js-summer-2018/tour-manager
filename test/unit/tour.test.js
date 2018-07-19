const chai = require('chai');
const { assert } = chai;
const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {

    it('Validates good model', () => {
        const data = {
            title: 'Grand Tour',
            activities: ['racing', 'drifting', 'drinking'],
            launchDate: new Date,
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'Oregon',
                    zip: 97041
                },
                weather: {
                    temperature: 50
                },
                attendance: 1
            }]
        };

        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

    it('Title is required validation', () => {
        const tour = new Tour({});
        const validation = tour.validateSync();
        assert.isDefined(validation);

        const errors = validation.errors;
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.title.kind, ('required'));
    });

    it('Requires min attendence is 1', () => {
        const tour = new Tour({
            title: 'Okay Tour',
            activities: ['lions', 'fire', 'huka'],
            launchDate: new Date,
            stops: [{
                location: {
                    city: 'Eugene',
                    state: 'Oregon',
                    zip: 97080
                },
                weather: {
                    temperature: 75
                },
                attendance: 0
            }]
        });
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});
