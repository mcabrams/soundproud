import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './player'
import * as api from '../utils/api'
import { trackFactory } from '../test/factories'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('set active track id action creator', () => {
  let incrementSpy
  let store
  const tracks = [trackFactory(), trackFactory()]
  const activeTrackId = tracks[0].id
  const inactiveTrackId = tracks[1].id

  beforeEach(() => {
    incrementSpy = jest.spyOn(api, 'createListenForTrackWithId')
      .mockImplementation(() => Promise.resolve())

    store = mockStore({
      player: {
        activeTrackId,
        isPlaying: true,
      },
    })
  })

  afterEach(() => {
    incrementSpy.mockRestore()
  })

  it('creates no actions when new track is same as current', () => (
    // $FlowFixMe
    store.dispatch(actions.setActiveTrackId(activeTrackId)).then(() => {
      expect(store.getActions()).toEqual([])
    })
  ))

  it('creates expected actions when new track', () => (
    // $FlowFixMe
    store.dispatch(actions.setActiveTrackId(inactiveTrackId)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: 'ACTIVE_TRACK_CHANGE',
          trackId: tracks[1].id,
        },
        {
          type: 'INCREMENT_LISTEN_COUNT_REQUEST',
          trackId: tracks[1].id,
        },
      ])
    })
  ))

  it('uses api to increment listen count', () => (
    // $FlowFixMe
    store.dispatch(actions.setActiveTrackId(inactiveTrackId)).then(() => {
      expect(incrementSpy).toHaveBeenCalledTimes(1)
      expect(incrementSpy).toHaveBeenCalledWith(inactiveTrackId)
    })
  ))

  it('does not use api to increment listen count when same track', () => (
    // $FlowFixMe
    store.dispatch(actions.setActiveTrackId(activeTrackId)).then(() => {
      expect(incrementSpy).toHaveBeenCalledTimes(0)
    })
  ))

  it('creates expected actions when new track but fails', () => {
    incrementSpy = jest.spyOn(api, 'createListenForTrackWithId')
      .mockImplementation(() => Promise.reject())

    // $FlowFixMe
    return store.dispatch(actions.setActiveTrackId(inactiveTrackId)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: 'ACTIVE_TRACK_CHANGE',
          trackId: tracks[1].id,
        },
        {
          type: 'INCREMENT_LISTEN_COUNT_REQUEST',
          trackId: tracks[1].id,
        },
        {
          type: 'INCREMENT_LISTEN_COUNT_FAILURE',
          trackId: tracks[1].id,
        },
      ])
    })
  })
})

describe('toggle playing action creator', () => {
  it('should return proper action', () => {
    expect(actions.togglePlaying()).toEqual({
      type: 'TOGGLE_PLAYING',
    })
  })
})

describe('set playing action creator', () => {
  it('should return proper action', () => {
    expect(actions.setPlaying()).toEqual({
      type: 'SET_PLAYING',
      playing: true,
    })
  })
})

describe('set paused action creator', () => {
  it('should return proper action', () => {
    expect(actions.setPaused()).toEqual({
      type: 'SET_PLAYING',
      playing: false,
    })
  })
})
