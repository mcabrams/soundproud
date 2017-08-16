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
