const router = require('express').Router();
const Tour = require('../models/tour');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .get('/', (req, res) => {
        Tour.find(req.query)
            .select('title activities')
            .lean()
            .then(tours => res.json(tours));
    })
    
    .get('/:id', (req, res) => {
        Tour.findById(req.params.id)
            .select('activities')
            .lean()
            .then(tour => res.json(tour));
    })

    .put('/:id', (req, res) => {
        Tour.findByIdAndUpdate(req.params.id, req.body, updateOptions)
            .then(tour => res.json(tour));
    })

    .delete('/:id', (req, res) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(result => res.json({ removed: !!result }));
    })

    .post('/', (req, res) => {
        Tour.create(req.body)
            .then(tour => res.json(tour));
    });