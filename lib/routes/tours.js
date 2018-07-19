const router = require('express').Router();
const Tour = require('../models/tour');

module.exports = router
    .get('/:id', (req, res) => {
        Tour.findById(req.params.id) 
            .lean()
            .then(tour => res.json(tour));
    })
    .post('/', (req, res) => {
        Tour.create(req.body) 
            .then(tour => res.json(tour));
    });