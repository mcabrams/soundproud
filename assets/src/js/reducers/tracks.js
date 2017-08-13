import type { Action } from '../actions/types'
import type { TrackAlias } from '../typechecking/aliases'

const initialState = {
  isFetching: false,
  items: [],
  pagesRequested: 0,
  pagesLoaded: 0,
  pagesLeft: null,
}

type State = {
  +isFetching: boolean,
  +items: Array<TrackAlias>,
  +pagesRequested: number,
  +pagesLoaded: number,
  +pagesLeft: ?number,
}

export default function tracks(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'RECEIVE_TRACKS':
      return {
        ...state,
        isFetching: false,
        items: action.tracks,
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
