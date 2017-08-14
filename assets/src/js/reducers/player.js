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

export function nextTrackId(id: ?number, allIds: Array<number>) {
  return getAdjacentTrack(id, allIds, +1)
}

export function previousTrackId(id: ?number, allIds: Array<number>) {
  return getAdjacentTrack(id, allIds, -1)
}

function getAdjacentTrack(id: ?number, allIds: Array<number>, offset) {
  if (allIds.length === 0) {
    return null
  }

  if (id == null) {
    return firstMemberOf(allIds)
  }

  const adjacentTrackIndex = allIds.indexOf(id) + offset

  if (isNegative(offset) && isNegative(adjacentTrackIndex)) {
    return lastMemberOf(allIds)
  }

  if (allIds[adjacentTrackIndex] == null) {
    return allIds[0]
  }

  return allIds[adjacentTrackIndex]
}

function isNegative(int: number) {
  return Math.sign(int) === -1
}

function firstMemberOf<T>(list: Array<T>): T {
  return list[0]
}

function lastMemberOf<T>(list: Array<T>): T {
  return list.slice(-1)[0]
}
