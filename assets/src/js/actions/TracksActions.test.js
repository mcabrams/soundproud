import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as actions from './TracksActions'
import * as api from '../utils/api'
import { trackFactory } from '../test/factories'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('request tracks action creator', () => {
  it('should create an action to request tracks with default page 1', () => {
    expect(actions.requestTracks()).toEqual({
      type: 'TRACKS_REQUEST',
      page: 1,
    })
  })

  it('should request specific page if passed', () => {
    expect(actions.requestTracks(3)).toEqual({
      type: 'TRACKS_REQUEST',
      page: 3,
    })
  })
})

describe('receive tracks action creator', () => {
  const data = {
    tracks: [trackFactory(), trackFactory()],
    pagesLeft: 3,
  }

  it('should handle data', () => {
    expect(actions.receiveTracks(data, 2)).toEqual({
      type: 'TRACKS_RECEIVAL',
      tracks: data.tracks,
      pagesLeft: data.pagesLeft,
      pagesLoaded: 2,
    })
  })
})

describe('fetch tracks action creator', () => {
  let tracks
  let fetchMock
  let fetchSpy
  let store

  beforeEach(() => {
    tracks = [1, 2]
    fetchMock = () => Promise.resolve({ tracks, pagesLeft: 1 })
    fetchSpy = jest.spyOn(api, 'fetchTracksData').mockImplementation(fetchMock)
    store = mockStore({
      tracks: {
        isFetching: false,
        byId: {},
        pagesRequested: 0,
        pagesLoaded: 0,
        pagesLeft: null,
      },
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates expected actions when fetching tracks has been done', () => {
    const expectedActions = [
      { type: 'TRACKS_REQUEST', page: 1 },
      { type: 'TRACKS_RECEIVAL', tracks, pagesLeft: 1, pagesLoaded: 1 },
    ]

    // $FlowFixMe
    return store.dispatch(actions.fetchTracks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('calls api to fetch tracks data page 1 by default', () => (
    // $FlowFixMe
    store.dispatch(actions.fetchTracks()).then(() => {
      expect(fetchSpy).toHaveBeenCalledWith(1)
    })
  ))

  it('calls api to fetch tracks data page based on pagesLoaded', () => {
    store = mockStore({
      tracks: {
        isFetching: false,
        byId: {},
        pagesRequested: 0,
        pagesLoaded: 3,
        pagesLeft: 1,
      },
    })

    // $FlowFixMe
    return store.dispatch(actions.fetchTracks()).then(() => {
      expect(fetchSpy).toHaveBeenCalledWith(4)
    })
  })

  it('calls api to fetch tracks data', () => (
    // $FlowFixMe
    store.dispatch(actions.fetchTracks()).then(() => {
      expect(fetchSpy).toHaveBeenCalledWith(1)
    })
  ))

  it('creates no actions when 0 pages left', () => {
    store = mockStore({
      tracks: {
        isFetching: false,
        byId: {},
        pagesRequested: 0,
        pagesLoaded: 0,
        pagesLeft: 0,
      },
    })

    // $FlowFixMe
    return store.dispatch(actions.fetchTracks()).then(() => {
      expect(store.getActions()).toEqual([])
    })
  })

  it('creates no actions when is currently fetching', () => {
    store = mockStore({
      tracks: {
        isFetching: true,
        byId: {},
        pagesRequested: 0,
        pagesLoaded: 0,
        pagesLeft: 3,
      },
    })

    // $FlowFixMe
    return store.dispatch(actions.fetchTracks()).then(() => {
      expect(store.getActions()).toEqual([])
    })
  })
})
