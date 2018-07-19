const { assert } = require('chai');
const Tour = require('../../lib/models/tour');
const { getErrors } = require('./helpers');

const data = {
    title: 'Avocado Toast and Circuses',
    activities: ['juggling', 'elephants', 'cotton candy'],
    launchDate: new Date,
    stops: [
        {
            location: {
                city: 'Portland'
            },
            weather: {
                temperature: 90
            },
            attendance: 20
        }
    ]
};

describe('Circus tour model', () => {
    it('validates good model', () => {
        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
        assert.isUndefined(tour.validateSync());
    });

    it('validates required fields', () => {
        const tour = new Tour();
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('checks that the minimum number for attendance is 1', () => {
        const tour = new Tour({
            title: 'Avocado Toast and Circuses',
            stops: [
                {
                    location: {
                        city: 'Beaverton'
                    },
                    weather: {
                        temperature: 80
                    },
                    attendance: 0
                }
            ]
        });
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});