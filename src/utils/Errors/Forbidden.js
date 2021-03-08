const ApplicationError = require('./ApplicationError');

class ForbiddenError extends ApplicationError {
  constructor (message) {
    super(
      403,
      message ||
        'The server understood the request, but is refusing to fulfill it.'
    );
  }
}

module.exports = ForbiddenError;
