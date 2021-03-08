const ApplicationError = require('./ApplicationError');

class ValidationError extends ApplicationError {
  constructor (message) {
    super(400, message || 'Validation Error. Check provided data.');
  }
}

module.exports = ValidationError;
