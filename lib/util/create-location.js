const { HttpError } = require('./errors');
const getLocationWeather = require('./location-weather');

module.exports = function createLocationWeather(api = getLocationWeather) {
    return (req, res, next) => {
        console.log('ABOUT TO CREATE GET LOCATION', req.body.zip);
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
                message: 'Bad Request'
            });
            next(error);
        }
    };
};
