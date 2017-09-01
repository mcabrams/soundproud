import * as api from '../utils/api'
import type { Dispatch, GetState } from '../typechecking/aliases'

export function setActiveTrackId(trackId: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    if (getState().player.activeTrackId === trackId) {
      return Promise.resolve()
    }

    dispatch({
      type: 'ACTIVE_TRACK_CHANGE',
      trackId,
    })

    dispatch({
      type: 'INCREMENT_LISTEN_COUNT_REQUEST',
      trackId,
    })

    return api.createListenForTrackWithId(trackId)
      .catch(() => (
        dispatch({
          type: 'INCREMENT_LISTEN_COUNT_FAILURE', trackId,
        })
      ))
  }
}

export function togglePlaying() {
  return {
    type: 'TOGGLE_PLAYING',
  }
}

export function setPlaying() {
  return {
    type: 'SET_PLAYING',
    playing: true,
  }
}

export function setPaused() {
  return {
    type: 'SET_PLAYING',
    playing: false,
  }
}

export function setCurrentTime(currentTime: number, duration: number) {
  return {
    type: 'SET_CURRENT_TIME',
    currentTime,
    duration,
  }
}
