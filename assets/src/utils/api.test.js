import axios from 'axios'
import * as api from './api'
import { MissingParamaterError } from './errors'

jest.mock('axios', () => ({ patch: jest.fn() }))

describe('archiveTrack', () => {
  it('should call axios.patch correctly', () => {
    const track = { id: 42 }

    api.archiveTrack(track)

    expect(axios.patch).toHaveBeenCalledWith('/tracks/42/', {
      archived: true,
    })
  })

  it('should raise error if track not passed', () => {
    expect(api.archiveTrack).toThrow(MissingParamaterError)
  })
})
