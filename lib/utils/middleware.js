
function createMiddleware(api) {
    return (req, res, next) => {
        return api(req.query.zip).then(weatherData => {
            req.body = weatherData;
            next();
        });
    }; 
}

module.exports = {
    createMiddleware
};