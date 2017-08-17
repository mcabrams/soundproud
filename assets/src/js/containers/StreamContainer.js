import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import Stream from '../components/Stream'
import type { StreamPropsType } from '../components/Stream'
import { fetchTracks } from '../actions/tracks'

type OwnProps = { filter?: string }

function filterTracks(tracks, filter) {
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

const mapStateToProps = (state, ownProps: OwnProps) => {
  const { tracks: { allIds, byId, pagesLeft } } = state

  const tracks = allIds.reduce(
    (accumulator, id) => [...accumulator, byId[id]],
    [],
  )

  const filtered = filterTracks(tracks, ownProps.filter)

  return {
    hasMore: pagesLeft > 0,
    tracks: filtered,
  }
}

const mapDispatchToProps = (dispatch: *) => ({
  loadMore: () => dispatch(fetchTracks()),
})

const connector: Connector<OwnProps, StreamPropsType> = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const StreamContainer = connector(Stream)

export default StreamContainer
