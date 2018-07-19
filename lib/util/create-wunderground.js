const { HttpError } = require('./errors');

module.exports = function createMiddleware(api) {
    return (req, res, next) => {
        if(req.body.zip) {
            return api(req.body.zip)
                .then(({ location, weather }) => {
                    req.body.location = location;
                    req.body.weather = weather;
                    next();
                });
        }
        else {
            const error = new HttpError({
                code: 400,
                message: 'Bad Request'
            });
            next(error);
        }
    };
};