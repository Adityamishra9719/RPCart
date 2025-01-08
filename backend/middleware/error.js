import ErrorHander from '../utils/errorhandler.js';

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // wrong mongodb product id  error
    if (err.name === "CastError") {
        const message = `Resource not found Invalid : ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 400);
    }

    // Wrong JWT error
    if (err.code === "JsonWebTokenError") {
        const message = `Json web token is invalid, try again`;
        err = new ErrorHander(message, 400);
    }

    // JWT expire error
    if (err.code === "JsonExpiredError") {
        const message = `Json web token is Expired, try again`;
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};