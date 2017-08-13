import reducer from './tracks'
import { trackFactory } from '../test/factories'

const initialState = {
  isFetching: false,
  byId: {},
  pagesRequested: 0,
  pagesLeft: null,
  pagesLoaded: 0,
}

describe('tracks reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle TRACKS_REQUEST', () => {
    expect(reducer(initialState, {
      type: 'TRACKS_REQUEST',
      page: 1,
      pagesLoaded: 0,
    })).toEqual({
      isFetching: true,
      byId: {},
      pagesRequested: 1,
      pagesLeft: null,
      pagesLoaded: 0,
    })
  })

  describe('should hanlde TRACKS_RECEIVAL', () => {
    it('when no tracks present', () => {
      const state = {
        isFetching: true,
        byId: {},
        pagesRequested: 1,
        pagesLeft: 5,
        pagesLoaded: 0,
      }

      const receivedTracks = [trackFactory(), trackFactory()]

      expect(reducer(state, {
        type: 'TRACKS_RECEIVAL',
        tracks: receivedTracks,
        pagesLeft: 5,
        pagesLoaded: 1,
      })).toEqual({
        isFetching: false,
        byId: {
          [receivedTracks[0].id]: receivedTracks[0],
          [receivedTracks[1].id]: receivedTracks[1],
        },
        pagesRequested: 1,
        pagesLeft: 5,
        pagesLoaded: 1,
      })
    })

    it('when tracks currently present', () => {
      const existingTrack = trackFactory()

      const state = {
        isFetching: false,
        byId: {
          [existingTrack.id]: existingTrack,
        },
        pagesRequested: 1,
        pagesLeft: 5,
        pagesLoaded: 0,
      }

      const receivedTracks = [trackFactory(), trackFactory()]

      expect(reducer(state, {
        type: 'TRACKS_RECEIVAL',
        tracks: receivedTracks,
        pagesLeft: 5,
        pagesLoaded: 1,
      })).toEqual({
        isFetching: false,
        byId: {
          [existingTrack.id]: existingTrack,
          [receivedTracks[0].id]: receivedTracks[0],
          [receivedTracks[1].id]: receivedTracks[1],
        },
        pagesRequested: 1,
        pagesLeft: 5,
        pagesLoaded: 1,
      })
    })
  })

  it('should handle ARCHIVE_TRACK_REQUEST', () => {
    const existingTrack = trackFactory()
    const state = {
      isFetching: false,
      byId: {
        [existingTrack.id]: existingTrack,
      },
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    }

    expect(reducer(state, {
      type: 'ARCHIVE_TRACK_REQUEST',
      trackId: existingTrack.id,
    })).toEqual({
      isFetching: false,
      byId: {
        [existingTrack.id]: { ...existingTrack, archived: true },
      },
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    })
  })
})
