export function setActiveTrackId(trackId: number) {
  return {
    type: 'ACTIVE_TRACK_CHANGE',
    trackId,
  }
}
