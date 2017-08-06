import { throwIfMissing } from './helpers'
import { MissingParamaterError } from './errors'

describe('throwIfMissing', () => {
  it('throws MissingParamaterError', () => {
    expect(throwIfMissing).toThrow(MissingParamaterError)
  })
})
