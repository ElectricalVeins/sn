const ApplicationError = require('./ApplicationError')

class AuthorizationError extends ApplicationError {
  constructor (msg) {
    super(401, msg || 'Authorization Error')
  }
}
module.exports = AuthorizationError
