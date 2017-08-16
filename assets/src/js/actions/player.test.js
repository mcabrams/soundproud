import * as actions from './player'
import { trackFactory } from '../test/factories'

describe('set active track id action creator', () => {
  const tracks = [trackFactory(), trackFactory()]

  it('should return proper action', () => {
    expect(actions.setActiveTrackId(tracks[0].id)).toEqual({
      type: 'ACTIVE_TRACK_CHANGE',
      trackId: tracks[0].id,
    })
  })
})

describe('toggle playing action creator', () => {
  it('should return proper action', () => {
    expect(actions.togglePlaying()).toEqual({
      type: 'TOGGLE_PLAYING',
    })
  })
})

describe('set playing action creator', () => {
  it('should return proper action', () => {
    expect(actions.setPlaying()).toEqual({
      type: 'SET_PLAYING',
      playing: true,
    })
  })
})

describe('set paused action creator', () => {
  it('should return proper action', () => {
    expect(actions.setPaused()).toEqual({
      type: 'SET_PLAYING',
      playing: false,
    })
  })
})
