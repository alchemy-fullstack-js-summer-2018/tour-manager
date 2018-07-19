const { assert } = require('chai');
const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {

    it('validates good model', () => {
        const data = {
            title: 'Amazers',
            activities: 'trapeze',
            launchDate: Date,
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'OR',                        
                    zip: 97203,
                },
                weather: 97203,
                attendance: 1000,
            }],
        };

        const tour = new Tour(data);
        
        const json = tour.toJSON();
        delete json._id;
        console.log('** tour validate **', tour);
        // json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        // assert.isUndefined(tour.validateSync());
    });

    it('title is required', () => {
        const tour = new Tour({});
        console.log('** tour **', tour);
        const errors = getErrors(tour.validateSync(), 5);
        assert.equal(errors.title.kind, 'required');  
    });

});