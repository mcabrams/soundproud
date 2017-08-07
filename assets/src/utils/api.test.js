import axios from 'axios'
import * as api from './api'

jest.mock('axios', () => ({ patch: jest.fn() }))

describe('archiveTrack', () => {
  it('should call axios.patch correctly', () => {
    const track = { id: 42 }

    api.archiveTrack(track)

    expect(axios.patch).toHaveBeenCalledWith('/tracks/42/', {
      archived: true,
    })
  })
})
