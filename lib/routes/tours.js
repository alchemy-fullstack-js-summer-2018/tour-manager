const router = require('express').Router();
const Tour = require('../models/tour');

module.exports = router
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Tour.find()
            .then(tours => res.json(tours))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Tour.findById(req.params.id)
            .then(tour => res.json(tour))
            .catch(next);
    });