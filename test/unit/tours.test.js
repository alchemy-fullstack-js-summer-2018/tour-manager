const chai = require('chai');
const { assert } = chai;
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {

    it('validates good model', () => {
        const data = {
            // example full, good data
        };
        const tour = new Tour(data);

        const json = tour.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

});