const router = require('express').Router();
const Tour = require('../models/tour');
const { HttpError } = require('../util/errors');

// const updateOptions = {
//     new: true,
//     runValidators: true
// };

const make404 = id => new HttpError({
    code: 404,
    message: `No tour with an id ${id}`
});

module.exports = router
    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Tour.findByIdAndRemove(req.params.id)
            .then(tour => res.json({ removed: !!tour }))
            .catch(next);
    })

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
                    next(make404(req.param.id));
                }
                else {
                    res.json(tour);
                }
            })
            .catch(next);
    })
    // stops //
    // .post('/:id/stops', (req, res, next) => {
    //     Tour.findByIdAndUpdate(
    //         req.params.id,
    //         {
    //             $push: {
    //                 stops: req.body
    //             }
    //         },
    //         updateOptions
    //     )
    //         .then(tour => {
    //             if(!tour) {
    //                 next(make404(req.params.id));
    //             }
    //             else {
    //                 res.json(tour.stops[tour.stops.length - 1]);
    //             }
    //         })
    //         .catch(next);
    // })

    // delete a stop
    .delete('/:id/stops/:stopid', (req, res, next) => {
        // REMOVE findByIdAndUpdate --- Try <remove> instead
        Tour.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    stops: { _id: req.params.stopid }
                }
            },
            {
                new: true,
                runValidators: true
            }
        )    
            .then(tour => {
                if(!tour) {
                    next(make404(req.params.id));
                } else res.json({ removed: true });
            })
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
            {
                new: true,
                runValidators: true
            }
        )
            .then(tour => {
                if(!tour) {
                    next(make404(req.params.id));
                } else res.json(tour.stops[tour.stops.length - 1]);
            })
            .catch(next);            
    });