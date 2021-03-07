const ApplicationError = require('./ApplicationError')

class AuthenticationTimeoutError extends ApplicationError {
  constructor (message) {
    super(419, message || 'Access token is missing or expired')
  }
}
module.exports = AuthenticationTimeoutError
