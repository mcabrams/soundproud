import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as actions from './TracksActions'
import * as api from '../utils/api'
import { trackFactory } from '../test/factories'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('request tracks action creator', () => {
  it('should create an action to request tracks', () => {
    expect(actions.requestTracks()).toEqual({
      type: 'REQUEST_TRACKS',
    })
  })
})

describe('receive tracks action creator', () => {
  const data = {
    tracks: [trackFactory(), trackFactory()],
    pagesLeft: 3,
  }

  it('should handle data', () => {
    expect(actions.receiveTracks(data)).toEqual({
      type: 'RECEIVE_TRACKS',
      tracks: data.tracks,
      pagesLeft: data.pagesLeft,
    })
  })
})

describe('fetch tracks action creator', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates expected actions when fetching tracks has been done', () => {
    const tracks = [1, 2]
    const fetchMock = () => Promise.resolve({ tracks })
    jest.spyOn(api, 'fetchTracksData').mockImplementation(fetchMock)

    const expectedActions = [
      { type: 'REQUEST_TRACKS' },
      { type: 'RECEIVE_TRACKS', tracks },
    ]

    const store = mockStore()

    // $FlowFixMe
    return store.dispatch(actions.fetchTracks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
