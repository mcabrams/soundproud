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
      type: 'REQUEST_TRACKS',
      page: 1,
    })
  })

  it('should request specific page if passed', () => {
    expect(actions.requestTracks(3)).toEqual({
      type: 'REQUEST_TRACKS',
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
      type: 'RECEIVE_TRACKS',
      tracks: data.tracks,
      pagesLeft: data.pagesLeft,
      pagesLoaded: 2,
    })
  })
})

describe('fetch tracks action creator', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates expected actions when fetching tracks has been done', () => {
    const tracks = [1, 2]
    const fetchMock = () => Promise.resolve({ tracks, pagesLeft: 1 })
    jest.spyOn(api, 'fetchTracksData').mockImplementation(fetchMock)

    const expectedActions = [
      { type: 'REQUEST_TRACKS', page: 1 },
      { type: 'RECEIVE_TRACKS', tracks, pagesLeft: 1, pagesLoaded: 1 },
    ]

    const store = mockStore({
      tracks: {
        isFetching: false,
        items: [],
        pagesRequested: 0,
        pagesLoaded: 0,
        pagesLeft: null,
      },
    })

    // $FlowFixMe
    return store.dispatch(actions.fetchTracks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates no actions when 0 pages left', () => {
    const store = mockStore({
      tracks: {
        isFetching: false,
        items: [],
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
    const store = mockStore({
      tracks: {
        isFetching: true,
        items: [],
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
