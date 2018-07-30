const { HttpError } = require('./errors');
const getLocationWeather = require('./get-weather');

module.exports = function createLocationWeather(api = getLocationWeather) {
    return (req, res, next) => {
        if(req.body.zip) {

            return api(req.body.zip)
                .then(data => {
                    req.body = data;
                    next();
                });
        }
        else {
            const error = new HttpError({
                code: 400,
                message: 'Bad Request: Missing Zip Code'
            });
            next(error);
        }
    };
};