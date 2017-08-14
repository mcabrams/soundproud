import reducer from './player'
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

