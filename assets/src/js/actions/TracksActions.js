import * as types from '../constants/ActionTypes'
import type { TrackAlias } from '../typechecking/aliases'

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
