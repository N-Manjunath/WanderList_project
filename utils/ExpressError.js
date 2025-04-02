class ExpressError extends Error {
    constructor(message, statusCode = 500) { // Message first, default status 500
        super(message); // Pass message to Error class
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
