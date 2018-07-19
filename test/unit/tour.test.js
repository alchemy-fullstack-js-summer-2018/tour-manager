const { assert } = require('chai');
const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/tour');

describe('Tour model', () => {

    it('validates good model', () => {
        const data = {
            title: 'Jezbo\'s Dark Carnival',
            activities: ['Hatchet Juggling', 'Dubstep Finger Tutting', 'Faygo Contest', 'Axe Toss', 'Joker Card Tarot', 'Carnival of Terrier Dog Wash'],
            launchDate: new Date(2018, 8, 19),
            stops: [{
                location: {
                    city: 'Portland',
                    state: 'OR',
                    zip: '97217'
                }, 
                weather: {
                    temperature: 85,
                    condition: 'Sunny'
                }, 
                attendance: 420  
            }]
        };
        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(s => delete s._id);
        assert.deepEqual(json, data);
    });
    it('validates a title is required', () => {
        const tour = new Tour({});
        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors.title.kind, 'required');
    });
    it('attendance is at least 1', () => {
        const tour = new Tour({
            title: 'tour',
            stops: { attendance: 0 }
        });
        const errors = getErrors(tour.validateSync(), 1);
        //assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });
});