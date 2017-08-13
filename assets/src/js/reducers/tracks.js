import type { Action } from '../actions/types'
import type { TrackAlias } from '../typechecking/aliases'

const initialStateById = {}

const initialState = {
  isFetching: false,
  byId: initialStateById,
  pagesRequested: 0,
  pagesLoaded: 0,
  pagesLeft: null,
}

type State = {
  +isFetching: boolean,
  +byId: {
    [track_id: number]: TrackAlias,
  },
  +pagesRequested: number,
  +pagesLoaded: number,
  +pagesLeft: ?number,
}

function byId(state: State = initialStateById, action: Action) {
  switch (action.type) {
    case 'RECEIVE_TRACKS':
      return {
        ...state,
        ...action.tracks.reduce((accumulator, track) => ({
          ...accumulator,
          [track.id]: track,
        }), {}),
      }
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
    default:
      return state
  }
}
