import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as actions from './TracksActions'
import * as types from '../constants/ActionTypes'
import * as api from '../utils/api'
import { trackFactory } from '../tests/factories'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

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

describe('fetch tracks action creator', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates expected actions when fetching tracks has been done', () => {
    const tracks = [1, 2]
    const fetchMock = () => Promise.resolve({ tracks })
    jest.spyOn(api, 'fetchTracksData').mockImplementation(fetchMock)

    const expectedActions = [
      { type: types.REQUEST_TRACKS },
      { type: types.RECEIVE_TRACKS, tracks },
    ]

    const store = mockStore()

    // $FlowFixMe
    return store.dispatch(actions.fetchTracks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
