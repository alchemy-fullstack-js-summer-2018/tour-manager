const api404 = (req, res, next) => {
    next(new HttpError)({
        code: 404,
        message: 'Api path does not exist'
    });
};

class HttpError extends Error {
    constructor({ code, message }) {
        super(message);
        this.code = code;
        this.name = 'HttpError';
    }
}

module.exports = {
    api404,
    HttpError
};