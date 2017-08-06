export class MissingParamaterError {
  constructor(message) {
    this.name = 'MissingParamaterError'
    this.message = message
    this.stack = new Error().stack
  }
}

MissingParamaterError.prototype = Object.create(Error.prototype)
