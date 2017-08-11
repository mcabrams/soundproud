import { REQUEST_TRACKS, RECEIVE_TRACKS } from '../constants/ActionTypes'
import type { TrackAlias } from '../typechecking/aliases'

const initialState = {
  isFetching: false,
  items: [],
}

type State = {
  +isFetching: boolean,
  +items: Array<TrackAlias>,
}

type Action = {
  +type: string,
  +tracks?: Array<TrackAlias>,
}

export default function tracks(state: State = initialState, action: Action) {
  switch (action.type) {
    case RECEIVE_TRACKS:
      return {
        ...state,
        isFetching: false,
        items: action.tracks,
      }
    case REQUEST_TRACKS:
      return {
        ...state,
        isFetching: true,
      }
    default:
      return state
  }
}
