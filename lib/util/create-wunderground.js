

module.exports = function createWunderground(api) {
    return (req, res, next) => {
        return api(req.body.zip)
            .then(({ location, weather }) => {
                req.body.location = location;
                req.body.weather = weather;
                next();
            });
    };
}