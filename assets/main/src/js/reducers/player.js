export type ActiveTrackChangeAction = {
  type: 'ACTIVE_TRACK_CHANGE',
  trackId: number,
}
export type TogglePlayingAction = { type: 'TOGGLE_PLAYING' }
export type SetCurrentTimeAction = {
  type: 'SET_CURRENT_TIME',
  currentTime: number,
  duration: number,
}
export type SetPlayingAction = {
  type: 'SET_PLAYING',
  playing: boolean,
}

type Action =
  | { type: '@@INIT' }
  | ActiveTrackChangeAction
  | TogglePlayingAction
  | SetCurrentTimeAction
  | SetPlayingAction

type State = {
  +isPlaying: boolean,
  +activeTrackId: ?number,
  +currentTime: number,
}

const initialState = {
  activeTrackId: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
}

export default function player(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'TOGGLE_PLAYING':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    case 'SET_PLAYING':
      return {
        ...state,
        isPlaying: action.playing,
      }
    case 'ACTIVE_TRACK_CHANGE':
      return {
        ...state,
        activeTrackId: action.trackId,
      }
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.currentTime,
        duration: action.duration,
      }
    default:
      return state
  }
}
