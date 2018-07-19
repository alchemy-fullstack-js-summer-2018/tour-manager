const router = require('express').Router();
const Tour = require('../models/tour');
const { HttpError } = require('../utils/errors');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .get('/:id', (req, res, next) => {
        Tour.findById(req.params.id) 
            .lean()
            .then(tour => res.json(tour))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Tour.find()
            .select('title')
            .lean()
            .then(tours => res.json(tours))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        Tour.create(req.body) 
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