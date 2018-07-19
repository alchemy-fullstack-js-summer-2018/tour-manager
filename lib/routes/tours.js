const router = require('express').Router();
const Tour = require('../models/tour');
// const { HttpError } = require('../util/errors');

module.exports = router
    .get('/', (req, res, next) => {
        Tour.find()
            .lean()
            .then(tours => res.json(tours))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Tour.findById(req.params.id)
            .lean()
            .then(tour => res.json(tour))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    });