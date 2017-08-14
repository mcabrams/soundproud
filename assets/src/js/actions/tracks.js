import * as api from '../utils/api'
import type { Dispatch, GetState, TrackAlias } from '../typechecking/aliases'
import type { State as TracksState } from '../reducers/tracks'

export function requestTracks(page: number = 1) {
  return {
    type: 'TRACKS_REQUEST',
    page,
  }
}

export function receiveTracks(
  data: {
    tracks: Array<TrackAlias>, pagesLeft: number
  },
  pagesLoaded: number) {
  return {
    type: 'TRACKS_RECEIVAL',
    tracks: data.tracks,
    pagesLeft: data.pagesLeft,
    pagesLoaded,
  }
}

function shouldFetchTracks(tracksState: TracksState) {
  if (tracksState.isFetching) {
    return false
  }

  if (tracksState.pagesLeft !== 0 && tracksState.pagesLeft == null) {
    return true
  }

  return (tracksState.pagesLeft > 0)
}

export function fetchTracks() {
  return (dispatch: Dispatch, getState: GetState) => {
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

export function archiveTrack(trackId: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'ARCHIVE_TRACK_REQUEST', trackId,
    })

    return api.archiveTrackWithId(trackId)
      .catch(() => (
        dispatch({
          type: 'ARCHIVE_TRACK_FAILURE', trackId,
        })
      ))
  }
}

export function setActiveTrackId(trackId: number) {
  return {
    type: 'ACTIVE_TRACK_CHANGE',
    trackId,
  }
}
