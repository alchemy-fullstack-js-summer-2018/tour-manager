
function createMiddleware(api) {
    return (req, res, next) => {
        api(req.query.zip).then(weatherData => {
            req.body.zip = req.query.zip;
            req.body.weather = weatherData.weather.temperature;
            req.body.weather = weatherData.weather.condition;
        });
        next();
    }; 
}

module.exports = {
    createMiddleware
};