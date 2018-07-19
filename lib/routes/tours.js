const router = require('express').Router();
const Tour = require('../models/tour');


module.exports = router
    .get('/', (req, res) => {
        Tour.find(req.query)
            .lean()
            .then(tours => res.json(tours));
    })

    .post('/', (req, res) => {
        Tour.create(req.body)
            .then(tour => res.json(tour));
    });