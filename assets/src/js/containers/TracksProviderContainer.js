import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import TracksProvider from '../components/TracksProvider'
import type { Props } from '../components/TracksProvider'

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
  const { tracks: { allIds, byId } } = state

  const tracks = allIds.reduce(
    (accumulator, id) => [...accumulator, byId[id]],
    [],
  )

  const filtered = filterTracks(tracks, ownProps.filter)

  return {
    tracks: filtered,
  }
}

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
)

const TracksProviderContainer = connector(TracksProvider)

export default TracksProviderContainer
