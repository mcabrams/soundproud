import reducer from './tracks'
import { trackFactory } from '../test/factories'

const initialState = {
  isFetching: false,
  items: [],
}

describe('tracks reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle REQUEST_TRACKS', () => {
    expect(reducer(initialState, { type: 'REQUEST_TRACKS' })).toEqual({
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
      type: 'RECEIVE_TRACKS',
      tracks: receivedTracks,
      pagesLeft: 5,
    })).toEqual({
      isFetching: false,
      items: receivedTracks,
      pagesLeft: 5,
    })
  })
})
