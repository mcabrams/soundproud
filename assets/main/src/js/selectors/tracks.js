import { createSelector } from 'reselect'
import type { TrackAlias } from '../typechecking/aliases'

const getAllIds = state => state.tracks.allIds
const getTracksById = state => state.tracks.byId
const getFilter = (state, filter) => filter

type TracksState = {
  tracks: {
    byId: {
      [number]: TrackAlias,
    },
    allIds: Array<number>
  }
}
type FilteredTracksSelector = (TracksState, ?string) => Array<TrackAlias>

const filteredTracksSelector: FilteredTracksSelector = createSelector(
  getAllIds,
  getTracksById,
  getFilter,
  (allIds, tracksById, filter) => {
    const tracks = allIds.reduce(
      (accumulator, id) => [...accumulator, tracksById[id]],
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
  },
)

export default filteredTracksSelector
