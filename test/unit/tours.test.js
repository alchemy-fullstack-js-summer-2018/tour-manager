const chai = require('chai');
const { assert } = chai;
const Tour = require('../../lib/models/tour');
const { getErrors } = require('./helpers');

describe('Tour model', () => {

    it('validates good model', () => {
        const data = {
            title: 'P.T. Barnum\'s Circus at London',
            activities: ['tightrope', 'trapeze', 'lion tamer'],
            launchDate: new Date(2018, 7, 18),
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
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

    it('validates that title is required', () => {
        const tour = new Tour({});
        const errors = getErrors(tour.validateSync(), 1);

        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('validates that min attendance for stops is 1', () => {
        const tour = new Tour({
            title: 'Being for the Benefit of Mr.Kite!',
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'Oregon',
                    zip: 92115
                },
                weather: {
                    temperature: 68,
                    condition: 'rainy'
                },
                attendance: 0
            }]
        });

        const errors = getErrors(tour.validateSync(), 1);
        
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });

    it('defaults date to now for launchDate', () => {
        const date = new Date().getDate();
        const tour = new Tour({
            title: 'Cirque de Soleil',
        });

        assert.strictEqual(tour.launchDate.getDate(), date);
    });

});