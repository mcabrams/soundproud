import type { Action } from '../actions/types'

type State = {
  +isPlaying: boolean,
}

const initialState = {
  isPlaying: false,
}

export default function player(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'TOGGLE_PLAYING':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    default:
      return state
  }
}
