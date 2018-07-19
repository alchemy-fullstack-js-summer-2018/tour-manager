const chai = require('chai');
const { assert } = chai;
const Tour = require('../../lib/models/tour');
const { getErrors } = require('./helpers');

describe('Tour data model', () => {

    // const getErrors = (validation, numberExpected) => {
    //     assert.isDefined(validation);
    //     const errors = validation.errors;
    //     assert.equal(Object.keys(errors).length, numberExpected);
    //     return errors;
    // };
    
    it('validates a good model', () => {
        const data = {
            title: 'The Amazing Tour!',
            activities: ['fire breathing', 'chimpanzees', 'creepy clowns'],
            launchDate: new Date(),
            stops: [
                {
                    location: {
                        city: 'Portland',
                        state: 'Oregon',
                        zip: 97209
                    },
                    weather: {
                        temperature: 75,
                        condition: 'Windy'
                    },
                    attendance: 5000
                },
                {
                    location: {
                        city: 'Seattle',
                        state: 'Washington',
                        zip: 98101
                    },
                    weather: {
                        temperature: 81,
                        condition: 'Mild'
                    },
                    attendance: 7500
                },
                {
                    location: {
                        city: 'Boise',
                        state: 'Idaho',
                        zip: 83701
                    },
                    weather: {
                        temperature: 55,
                        condition: 'Chilly'
                    },
                    attendance: 1000
                },
            ]
        };
        const tour = new Tour(data);

        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

    it('validates that name is required', () => {
        const tour = new Tour({});
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('validates proper attendance entry', () => {
        const data = {
            title: 'The Bad Tour',
            stops: [{
                location: {},
                weather: {},
                attendance: 500
            }]
        };
        const tour = new Tour(data);
        assert.isUndefined(tour.validateSync());
        tour.stops[0].attendance = 0;
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});