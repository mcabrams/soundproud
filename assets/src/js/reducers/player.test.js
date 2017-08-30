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

  describe('should handle TOGGLE_PLAYING', () => {
    it('if not playing', () => {
      expect(reducer(
        { isPlaying: false, activeTrackId: null },
        { type: 'TOGGLE_PLAYING' },
      )).toEqual(
        { isPlaying: true, activeTrackId: null },
      )
    })

    it('if is playing', () => {
      expect(reducer(
        { isPlaying: true, activeTrackId: null },
        { type: 'TOGGLE_PLAYING' },
      )).toEqual(
        { isPlaying: false, activeTrackId: null },
      )
    })
  })

  describe('should handle SET_PLAYING', () => {
    const scenarios = [
      { isPlaying: false, setPlaying: true, isPlayingResult: true },
      { isPlaying: true, setPlaying: true, isPlayingResult: true },
      { isPlaying: false, setPlaying: false, isPlayingResult: false },
      { isPlaying: true, setPlaying: false, isPlayingResult: false },
    ]

    scenarios.forEach(({ isPlaying, setPlaying, isPlayingResult }) => {
      const testName = `when isPlaying=${isPlaying.toString()}
                        and setPlaying=${setPlaying.toString()}`
      it(testName, () => {
        expect(reducer(
          { isPlaying, activeTrackId: null },
          { type: 'SET_PLAYING', playing: setPlaying },
        )).toEqual({ isPlaying: isPlayingResult, activeTrackId: null })
      })
    })
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
