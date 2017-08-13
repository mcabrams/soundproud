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

function shouldFetchTracks(tracksState) {
  if (tracksState.isFetching) {
    return false
  }

  if (tracksState.pagesLeft === null) {
    return true
  }

  return (tracksState.pagesLeft > 0)
}

export function fetchTracks() {
  return (dispatch: Dispatch, getState) => {
    const currentTracksState = getState().tracks

    if (!shouldFetchTracks(currentTracksState)) {
      return Promise.resolve()
    }

    const pageToRequest = currentTracksState.pagesLoaded + 1

    dispatch(requestTracks(pageToRequest))

    return api.fetchTracksData(pageToRequest)
      .then(data => dispatch(receiveTracks(data, pageToRequest)))
  }
}
