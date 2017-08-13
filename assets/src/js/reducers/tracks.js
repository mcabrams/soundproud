import type { Action } from '../actions/types'
import type { TrackAlias } from '../typechecking/aliases'

const initialStateById = {}

type StateById = {
  [trackId: number]: TrackAlias,
}

const initialState = {
  isFetching: false,
  byId: initialStateById,
  pagesRequested: 0,
  pagesLoaded: 0,
  pagesLeft: null,
}

type State = {
  +isFetching: boolean,
  +byId: StateById,
  +pagesRequested: number,
  +pagesLoaded: number,
  +pagesLeft: ?number,
}

export type ArchiveTrackAction = {
  type: 'REQUEST_ARCHIVE_TRACK',
  trackId: number,
}

function archiveTrack(state: StateById, action: ArchiveTrackAction) {
  const track = state[action.trackId]

  return {
    ...state,
    [action.trackId]: {
      ...track,
      archived: true,
    },
  }
}

function byId(state: StateById = initialStateById, action: Action) {
  switch (action.type) {
    case 'RECEIVE_TRACKS':
      return {
        ...state,
        ...action.tracks.reduce((accumulator, track) => ({
          ...accumulator,
          [track.id]: track,
        }), {}),
      }
    case 'REQUEST_ARCHIVE_TRACK':
      return archiveTrack(state, action)
    default:
      return state
  }
}

export default function tracks(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'RECEIVE_TRACKS':
      return {
        ...state,
        isFetching: false,
        byId: byId(state.byId, action),
        pagesLeft: action.pagesLeft,
        pagesLoaded: action.pagesLoaded,
      }
    case 'REQUEST_TRACKS':
      return {
        ...state,
        isFetching: true,
        pagesRequested: action.page,
      }
    case 'REQUEST_ARCHIVE_TRACK':
      return {
        ...state,
        byId: byId(state.byId, action),
      }
    default:
      return state
  }
}
