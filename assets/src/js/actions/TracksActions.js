import * as api from '../utils/api'
import type { Dispatch, TrackAlias } from '../typechecking/aliases'

export function requestTracks(page: number = 1) {
  return {
    type: 'REQUEST_TRACKS',
    page,
  }
}

export function receiveTracks(
  data: {
    tracks: Array<TrackAlias>, pagesLeft: number
  },
  pagesLoaded: number) {
  return {
    type: 'RECEIVE_TRACKS',
    tracks: data.tracks,
    pagesLeft: data.pagesLeft,
    pagesLoaded,
  }
}

export function fetchTracks() {
  return (dispatch: Dispatch, getState) => {
    const pageToRequest = getState().tracks.pagesLoaded + 1

    dispatch(requestTracks(pageToRequest))

    return api.fetchTracksData(pageToRequest)
      .then(data => dispatch(receiveTracks(data, pageToRequest)))
  }
}
