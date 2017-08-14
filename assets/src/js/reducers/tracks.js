import type { Action } from '../actions/types'
import type { TrackAlias } from '../typechecking/aliases'

const initialStateById = {}

type StateById = {
  [trackId: number]: TrackAlias,
}

const initialState = {
  activeTrackId: null,
  byId: initialStateById,
  isFetching: false,
  pagesLeft: null,
  pagesLoaded: 0,
  pagesRequested: 0,
}

export type State = {
  +activeTrackId: ?number,
  +byId: StateById,
  +isFetching: boolean,
  +pagesLeft: ?number,
  +pagesLoaded: number,
  +pagesRequested: number,
}

export type ArchiveTrackRequestAction = {
  type: 'ARCHIVE_TRACK_REQUEST',
  trackId: number,
}

export type ArchiveTrackFailureAction = {
  type: 'ARCHIVE_TRACK_FAILURE',
  trackId: number,
}

export type ActiveTrackChange = {
  type: 'ACTIVE_TRACK_CHANGE',
  trackId: number,
}

function setTrackArchived(
  state: StateById,
  action: ArchiveTrackRequestAction | ArchiveTrackFailureAction,
  archived: boolean,
) {
  const track = state[action.trackId]

  return {
    ...state,
    [action.trackId]: {
      ...track,
      archived,
    },
  }
}

function byId(state: StateById = initialStateById, action: Action) {
  switch (action.type) {
    case 'TRACKS_RECEIVAL':
      return {
        ...state,
        ...action.tracks.reduce((accumulator, track) => ({
          ...accumulator,
          [track.id]: track,
        }), {}),
      }
    case 'ARCHIVE_TRACK_REQUEST':
      return setTrackArchived(state, action, true)
    case 'ARCHIVE_TRACK_FAILURE':
      return setTrackArchived(state, action, false)
    default:
      return state
  }
}

export default function tracks(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'TRACKS_RECEIVAL':
      return {
        ...state,
        isFetching: false,
        byId: byId(state.byId, action),
        pagesLeft: action.pagesLeft,
        pagesLoaded: action.pagesLoaded,
      }
    case 'TRACKS_REQUEST':
      return {
        ...state,
        isFetching: true,
        pagesRequested: action.page,
      }
    case 'ARCHIVE_TRACK_REQUEST':
      return {
        ...state,
        byId: byId(state.byId, action),
      }
    case 'ARCHIVE_TRACK_FAILURE':
      return {
        ...state,
        byId: byId(state.byId, action),
      }
    case 'ACTIVE_TRACK_CHANGE':
      return {
        ...state,
        activeTrackId: action.trackId
      }
    default:
      return state
  }
}
