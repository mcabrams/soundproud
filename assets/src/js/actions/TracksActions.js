import * as api from '../utils/api'
import type { Dispatch, TrackAlias } from '../typechecking/aliases'

export function requestTracks() {
  return {
    type: 'REQUEST_TRACKS',
  }
}

export function receiveTracks(data: {
  tracks: Array<TrackAlias>, pagesLeft: number
}) {
  return {
    type: 'RECEIVE_TRACKS',
    tracks: data.tracks,
    pagesLeft: data.pagesLeft,
  }
}

export function fetchTracks() {
  return (dispatch: Dispatch) => {
    dispatch(requestTracks())

    return api.fetchTracksData()
      .then(data => dispatch(receiveTracks(data)))
  }
}
