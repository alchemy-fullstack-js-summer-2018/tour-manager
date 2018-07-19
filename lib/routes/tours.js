const router = require('express').Router();
const Tour = require('../models/tour');
//const { HttpError } = require('../util/errors');

// const updateOptions = {
//     new: true,
//     runValidators: true
// };

module.exports = router
    .get('/', (req, res, next) => {
        Tour.find()
            .lean()
            .then(tours => res.json(tours))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    });



