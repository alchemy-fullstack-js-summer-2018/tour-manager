const router = require('express').Router();
const Tour = require('../models/tour');
const { HttpError } = require('../util/errors');


const make404 = id => new HttpError({
    code: 404,
    message: `No tour with id ${id}`
});

// const updateOptions = {
//     new: true,
//     runValidators: true
// };

module.exports = router
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })
    // .post('/:id/stops', createStop, (req, res, next) => {

    // })
    .get('/', (req, res, next) => {
        Tour.find()
            .lean()
            .then(tours => res.json(tours))
            .catch(next);
    });




