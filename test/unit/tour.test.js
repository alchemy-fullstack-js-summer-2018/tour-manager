const chai = require('chai');
const { assert } = chai;
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {

    it('Validates good model', () => {
        const data = {
            title: 'Grand Tour',
            activities: ['racing', 'drifting', 'time trail'],
            // launchDate: Date,
            stops: [{
                city: 'Portland',
                state: 'Oregon',
                zip: 97020,
                weather: 'rain',
                attendance: 2
            }]
        };

        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

    it('Validates required fields', () => {
        const tour = new Tour({});
        const validation = tour.validateSync();
        assert.isDefined(validation);

        const errors = validation.errors;
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.title.kind, ('required'));
    });
});
