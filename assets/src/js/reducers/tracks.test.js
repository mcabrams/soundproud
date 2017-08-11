import reducer from './tracks'
import * as types from '../constants/ActionTypes'
import { trackFactory } from '../tests/factories'

const initialState = {
  isFetching: false,
  items: [],
}

describe('tracks reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'foo' })).toEqual(initialState)
  })

  it('should handle REQUEST_TRACKS', () => {
    expect(reducer(initialState, { type: types.REQUEST_TRACKS })).toEqual({
      isFetching: true,
      items: [],
    })
  })

  it('should handle RECEIVE_TRACKS', () => {
    const state = {
      isFetching: true,
      items: [],
    }

    const receivedTracks = [trackFactory(), trackFactory()]

    expect(reducer(state, {
      type: types.RECEIVE_TRACKS,
      tracks: receivedTracks,
    })).toEqual({
      isFetching: false,
      items: receivedTracks,
    })
  })
})
