const router = require('express').Router();
const Tour = require('../models/tour');

const updateOptions = {
    new: true,
    runValidators: true
};

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
    })
    .put('/:id', (req, res, next) => {
        Tour.findByIdAndUpdate(req.params.id, req.body, updateOptions)
            .then(tour => res.json(tour))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(tour => res.json({ removed: !!tour }))
            .catch(next);
    });
    