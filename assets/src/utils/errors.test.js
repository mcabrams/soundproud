import { MissingParamaterError } from './errors'

const error = new MissingParamaterError('foobar')

describe('MissingParamaterError', () => {
  it('has expected message', () => {
    expect(error.message).toEqual('foobar')
  })

  it('has correct name', () => {
    expect(error.name).toEqual('MissingParamaterError')
  })

  it.skip('has stack property that is instance of error stack', () => {
    // Not sure how to test this
  })

  it.skip('has prototype of Error', () => {
    // Not sure how to test this
  })
})
