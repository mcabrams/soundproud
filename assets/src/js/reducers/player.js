import type { Action } from '../actions/types'

type State = {
  +isPlaying: boolean,
  +activeTrackId: ?number,
}

const initialState = {
  activeTrackId: null,
  isPlaying: false,
}

export default function player(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'TOGGLE_PLAYING':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    case 'ACTIVE_TRACK_CHANGE':
      return {
        ...state,
        activeTrackId: action.trackId,
      }
    default:
      return state
  }
}
