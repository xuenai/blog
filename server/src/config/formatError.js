import { GraphQLError } from 'graphql'

class ValidationError extends GraphQLError {
  constructor(errors) {
    super('无效的请求')
    console.log('error', errors)
    this.state = errors
  }
}

export default error => ({
  message: error.message,
  state: error.originalError && error.originalError.state,
  locations: error.locations,
  path: error.path
})

export { ValidationError }