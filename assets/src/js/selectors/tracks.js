import { createSelector } from 'reselect'

const getTracks = (state, filter) => {
  const { tracks: { allIds, byId } } = state

  const tracks = allIds.reduce(
    (accumulator, id) => [...accumulator, byId[id]],
    [],
  )

  switch (filter) {
    case 'all':
      return tracks
    case 'archived':
      return tracks.filter(track => track.archived)
    case 'unarchived':
      return tracks.filter(track => !track.archived)
    default:
      return tracks.filter(track => !track.archived)
  }
}

export const filteredTracksSelector = createSelector(
  getTracks,
  tracks => tracks,
)
