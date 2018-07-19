const { assert } = require('chai');
const Tour = require('../../lib/models/tour');

const getErrors = (validation, number) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, number);
    return errors;
};

describe('Circus tour model', () => {
    const data = {
        title: 'The Dopest Show in the World',
        activities: ['juggling', 'elephants', 'cotton candy'],
        launchDate: new Date,
        stops: [{
            location: {
                city: 'Beaverton',
                state: 'OR',
                zip: 97152
            }
        }]
    };

    it('validates good model', () => {
        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        delete json.stops[0]._id;
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

    it('validates required fields', () => {
        const tour = new Tour();
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors.title.kind, 'required');
    });
});