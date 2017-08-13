import reducer from './tracks'
import { trackFactory } from '../test/factories'

const initialState = {
  isFetching: false,
  items: [],
  pagesRequested: 0,
  pagesLeft: null,
  pagesLoaded: 0,
}

describe('tracks reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle REQUEST_TRACKS', () => {
    expect(reducer(initialState, {
      type: 'REQUEST_TRACKS',
      page: 1,
      pagesLoaded: 0,
    })).toEqual({
      isFetching: true,
      items: [],
      pagesRequested: 1,
      pagesLeft: null,
      pagesLoaded: 0,
    })
  })

  it('should handle RECEIVE_TRACKS', () => {
    const state = {
      isFetching: true,
      items: [],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    }

    const receivedTracks = [trackFactory(), trackFactory()]

    expect(reducer(state, {
      type: 'RECEIVE_TRACKS',
      tracks: receivedTracks,
      pagesLeft: 5,
      pagesLoaded: 1,
    })).toEqual({
      isFetching: false,
      items: receivedTracks,
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 1,
    })
  })
})
