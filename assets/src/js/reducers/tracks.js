import type { Action } from '../actions/types'
import type { TrackAlias } from '../typechecking/aliases'

const initialState = {
  isFetching: false,
  items: [],
}

type State = {
  +isFetching: boolean,
  +items: Array<TrackAlias>,
}

export default function tracks(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'RECEIVE_TRACKS':
      return {
        ...state,
        isFetching: false,
        items: action.tracks,
        pagesLeft: action.pagesLeft,
      }
    case 'REQUEST_TRACKS':
      return {
        ...state,
        isFetching: true,
      }
    default:
      return state
  }
}
