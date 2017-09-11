import reducer from './tracks'
import { trackFactory } from '../test/factories'

const initialState = {
  isFetching: false,
  allIds: [],
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
      allIds: [],
      pagesRequested: 1,
      pagesLeft: null,
      pagesLoaded: 0,
    })
  })

  describe('should handle TRACKS_RECEIVAL', () => {
    it('when no tracks present', () => {
      const state = {
        isFetching: true,
        byId: {},
        allIds: [],
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
        allIds: [receivedTracks[0].id, receivedTracks[1].id],
        pagesRequested: 1,
        pagesLeft: 5,
        pagesLoaded: 1,
      })
    })

    it('when tracks currently present', () => {
      const existingTrack = trackFactory()

      const state = {
        isFetching: false,
        allIds: [existingTrack.id],
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
        allIds: [existingTrack.id, receivedTracks[0].id, receivedTracks[1].id],
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
      allIds: [existingTrack.id],
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
      allIds: [existingTrack.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    })
  })

  it('should handle ARCHIVE_TRACK_FAILURE', () => {
    const archivedTrack = trackFactory({ archived: true })
    const state = {
      isFetching: false,
      byId: {
        [archivedTrack.id]: archivedTrack,
      },
      allIds: [archivedTrack.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    }

    expect(reducer(state, {
      type: 'ARCHIVE_TRACK_FAILURE',
      trackId: archivedTrack.id,
    })).toEqual({
      isFetching: false,
      byId: {
        [archivedTrack.id]: { ...archivedTrack, archived: false },
      },
      allIds: [archivedTrack.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    })
  })

  it('should handle INCREMENT_LISTEN_COUNT_REQUEST', () => {
    const track = trackFactory({ listenCount: 0 })
    const state = {
      isFetching: false,
      byId: {
        [track.id]: track,
      },
      allIds: [track.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    }

    expect(reducer(state, {
      type: 'INCREMENT_LISTEN_COUNT_REQUEST',
      trackId: track.id,
    })).toEqual({
      isFetching: false,
      byId: {
        [track.id]: { ...track, listen_count: 1 },
      },
      allIds: [track.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    })
  })

  it('should handle INCREMENT_LISTEN_COUNT_FAILURE', () => {
    const track = trackFactory({ listenCount: 1 })
    const state = {
      isFetching: false,
      byId: {
        [track.id]: track,
      },
      allIds: [track.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    }

    expect(reducer(state, {
      type: 'INCREMENT_LISTEN_COUNT_FAILURE',
      trackId: track.id,
    })).toEqual({
      isFetching: false,
      byId: {
        [track.id]: { ...track, listen_count: 0 },
      },
      allIds: [track.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    })
  })

  it('should handle INCREMENT_LISTEN_COUNT_FAILURE when 0', () => {
    const track = trackFactory({ listenCount: 0 })
    const state = {
      isFetching: false,
      byId: {
        [track.id]: track,
      },
      allIds: [track.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    }

    expect(reducer(state, {
      type: 'INCREMENT_LISTEN_COUNT_FAILURE',
      trackId: track.id,
    })).toEqual({
      isFetching: false,
      byId: {
        [track.id]: { ...track, listen_count: 0 },
      },
      allIds: [track.id],
      pagesRequested: 1,
      pagesLeft: 5,
      pagesLoaded: 0,
    })
  })
})
