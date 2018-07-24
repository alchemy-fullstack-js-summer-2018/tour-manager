module.exports = function getWeather(api) {

    return function(req, res, next) {
        api(req.query.zip).then(weatherData => {
            req.body.temperature = weatherData.weather.temperature;
            req.body.condition = weatherData.weather.condition;
            req.body.city = weatherData.weather.city;
            req.body.state = weatherData.weather.tate;
            req.body.zip = weatherData.weather.zip;
            req.body.id = weatherData.weather.id;
            next();
        });
    };
};