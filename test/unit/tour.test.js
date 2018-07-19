const chai = require('chai');
const { assert } = chai;
const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/tour');


describe('Tour model', () => {

    it('validates good model', () => {
        const data = { 
            title: 'UniverSoul Circus',
            activities: ['flying trapeze', 'carnival rides', 'carnival games'],
            launchDate: new Date(1998, 6, 1),
            stops: [{
                location: {
                    city: 'St Louis',
                    state: 'MO',
                    zip: 63101
                },
                weather: {
                    temperature: '75 C',
                    condition: 'sunny'
                },    
                attendance: 1234
            }]
        };    

        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

    it('validates required fields', () => {
        const tour = new Tour({});
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors.title.kind, 'required');
    });


    it('attendance is at least 1', () => {
        const tour = new Tour({
            title: 'UniverSoul Circus',
            stops: [{ attendance: 0 }]
        });

        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });

    


});