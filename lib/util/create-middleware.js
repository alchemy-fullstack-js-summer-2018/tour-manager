module.exports = function createMiddleware(api) {
    return (req, res, next) => {
        return api('94770')
            .then(data => {
                req.body.weather = data.weather;
                req.body.location = data.location;
                next();
            });
    };
};