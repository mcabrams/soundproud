import { nextTrackId, previousTrackId } from './player'

describe('next track id selector', () => {
  it('should select next track in allIds', () => {
    const activeTrackId = 1
    const allIds = [1, 2]

    expect(nextTrackId(activeTrackId, allIds)).toEqual(2)
  })

  it('should select first track in allIds if in last position', () => {
    const activeTrackId = 2
    const allIds = [1, 2]

    expect(nextTrackId(activeTrackId, allIds)).toEqual(1)
  })

  it('should return null if no tracks', () => {
    const activeTrackId = null
    const allIds = []

    expect(nextTrackId(activeTrackId, allIds)).toEqual(null)
  })
})

describe('previous track id selector', () => {
  it('should select previous track in allIds', () => {
    const activeTrackId = 2
    const allIds = [1, 2]

    expect(previousTrackId(activeTrackId, allIds)).toEqual(1)
  })

  it('should select last track in allIds if in first position', () => {
    const activeTrackId = 1
    const allIds = [1, 2]

    expect(previousTrackId(activeTrackId, allIds)).toEqual(2)
  })

  it('should return null if no tracks', () => {
    const activeTrackId = null
    const allIds = []

    expect(previousTrackId(activeTrackId, allIds)).toEqual(null)
  })
})
