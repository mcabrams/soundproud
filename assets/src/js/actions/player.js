export function setActiveTrackId(trackId: number) {
  return {
    type: 'ACTIVE_TRACK_CHANGE',
    trackId,
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
