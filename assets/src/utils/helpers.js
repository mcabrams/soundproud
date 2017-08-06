import { MissingParamaterError } from './errors'

export function throwIfMissing() {
  throw new MissingParamaterError()
}
