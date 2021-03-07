const ApplicationError = require('./ApplicationError')

class ResourceNotFoundError extends ApplicationError {
  constructor (resource = 'resource') {
    super(404, `Error 404: ${resource} not found.`)
  }
}
module.exports = ResourceNotFoundError
