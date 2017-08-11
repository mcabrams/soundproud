import * as actions from './TracksActions'
import * as types from '../constants/ActionTypes'
import { trackFactory } from '../tests/factories'

describe('request tracks action creator', () => {
  it('should create an action to request tracks', () => {
    expect(actions.requestTracks()).toEqual({
      type: types.REQUEST_TRACKS,
    })
  })
})

describe('receive tracks action creator', () => {
  const data = [trackFactory(), trackFactory()]

  it('should handle data', () => {
    expect(actions.receiveTracks(data)).toEqual({
      type: types.RECEIVE_TRACKS,
      tracks: data,
    })
  })
})
