import reducer from './player'
import { nextTrackId, previousTrackId } from './player'
import { trackFactory } from '../test/factories'

const initialState = {
  activeTrackId: null,
  isPlaying: false,
}

describe('player reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle TOGGLE_PLAYING if not playing', () => {
    expect(reducer(
      { isPlaying: false, activeTrackId: null },
      { type: 'TOGGLE_PLAYING' },
    )).toEqual(
      { isPlaying: true, activeTrackId: null },
    )
  })

  it('should handle TOGGLE_PLAYING if is playing', () => {
    expect(reducer(
      { isPlaying: true, activeTrackId: null },
      { type: 'TOGGLE_PLAYING' },
    )).toEqual(
      { isPlaying: false, activeTrackId: null },
    )
  })

  it('should handle ACTIVE_TRACK_CHANGE', () => {
    const track = trackFactory()
    const state = {
      activeTrackId: null,
      isPlaying: false,
    }

    expect(reducer(state, {
      type: 'ACTIVE_TRACK_CHANGE',
      trackId: track.id,
    })).toEqual({
      activeTrackId: track.id,
      isPlaying: false,
    })
  })
})

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
