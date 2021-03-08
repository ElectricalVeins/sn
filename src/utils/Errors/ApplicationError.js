class ApplicationError extends Error {
  constructor (status, message) {
    super();
    this.status = status || 400;
    this.message = message || 'Unkonwn Error';
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ApplicationError;
