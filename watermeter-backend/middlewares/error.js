const ErrorResponce = require('../utils/ErrorResponce')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message;

    //log into error
    console.log(err.message);

    //Sequilize wrong ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id ${err.value}`;
        error = new ErrorResponce(message, 404)
    }

    // error duplicate keys
    if (err.statusCode === 401) {
        const message = `Invalid Credientials`;
        error = new ErrorResponce(message, 401);
    }

    //vaidation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponce(message, 400)
    }
    //console.log(error.message);
    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Item not found' });
}

module.exports = errorHandler;