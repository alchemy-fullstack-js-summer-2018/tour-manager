const router = require('express').Router();
const Tour = require('../models/tour');
const { HttpError } = require('../util/errors');

const updateOptions = {
    new: true,
    runValidators: true
};

const make404 = id => new HttpError({
    code: 404,
    message: `No tour with id ${id}`
});

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
            .then(tour => {
                if(!tour) {
                    next(make404(req.params.id));
                } else {
                    res.json(tour);
                }
            })
            .catch(next);
    })
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })
    .put('/:id', (req, res, next) => {
        Tour.findByIdAndUpdate(
            req.params.id,
            req.body,
            updateOptions
        )
            .then(tour => res.json(tour))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(tour => res.json({ removed: !!tour }))
            .catch(next);
    })
    .post('/:id/stops', (req, res, next) => {
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
            .then(stop => {
                if(!stop) {
                    next(make404(req.params.id));
                }
                else {
                    res.json({ removed: !!stop });
                }
            })
            .catch(next);

    })
    .put('/:id/stops/:stopId/attendance', (req, res, next) => {
        Tour.findById(req.params.id)
            .then(tour => {
                let stop = tour.stops.find(s => s && s._id == req.params.stopId);
                stop.attendance = req.body.attendance;
                return tour.save();
            })
            .then(tour => res.json(tour))
            .catch(next);
    });