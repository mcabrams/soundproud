import * as types from '../constants/ActionTypes'
import * as api from '../utils/api'
import type { Dispatch, TrackAlias } from '../typechecking/aliases'

export function requestTracks() {
  return {
    type: types.REQUEST_TRACKS,
  }
}

export function receiveTracks(data: Array<TrackAlias>) {
  return {
    type: types.RECEIVE_TRACKS,
    tracks: data,
  }
}

export function fetchTracks() {
  return (dispatch: Dispatch) => {
    dispatch(requestTracks())

    return api.fetchTracksData()
      .then(data => data.tracks)
      .then(tracks => dispatch(receiveTracks(tracks)))
  }
}
