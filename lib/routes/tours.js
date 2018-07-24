const router = require('express').Router();
const Tour = require('../models/tour');
const { HttpError } = require('../utils/errors');
// const getLocationWeather = require('../../lib/utils/weather-data');

const updateOptions = {
    new: true,
    runValidators: true
};

const make404 = id => new HttpError({
    code: 404,
    message: `No tour with id ${id}`
});

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
    })
    //turned off middleware to not exceed api calls/day
    .post('/:id/stops', /* getLocationWeather, */ (req, res, next) => {
        Tour.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    stops: req.body
                }
            },
            updateOptions
        )
            .then(tour => {
                if(!tour) {
                    next(make404(req.params.id));
                }
                else {
                    res.json(tour.stops[tour.stops.length - 1]);
                }
            })
            .catch(next);
    })
    .delete('/:id/stops/:stopId', (req, res, next) => {
        Tour.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    stops: { _id: req.params.stopId }
                }
            },
            updateOptions
        )
            .then(tour => res.json(tour))
            .catch(next);
    })
    .put('/:id/stops/:stopId/attendance', (req, res, next) => {
        Tour.findById(req.params.id)
            .then(tour => {
                const stop = tour.stops.id(req.params.stopId);
                stop.attendance = req.body.attendance;
                stop.save();
                return tour;
            })
            .then(tour => res.json(tour))
            .catch(next);
    });

/* keep for later ref: */
/* .put('/:id/stops/:stopId/attendance', (req, res, next) => {
    Tour.findByIdAndUpdate(
        { 'stop._id': req.params.stopId },
        {
            $set: {
                'stops.$.attendance': req.body.attendance
            }
        },
        updateOptions
    )
        .then(tour => res.json(tour))
        .catch(next);
}) */