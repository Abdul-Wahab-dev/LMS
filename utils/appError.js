class AppError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.validation = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
