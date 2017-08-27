import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import Stream from '../components/Stream'
import type { StreamPropsType } from '../components/Stream'
import { fetchTracks } from '../actions/tracks'
import { filteredTracksSelector } from '../selectors/tracks'

type OwnProps = { filter: ?string }

const mapStateToProps = (state, { filter }: OwnProps) => {
  const { tracks: { pagesLeft } } = state

  return {
    hasMore: pagesLeft > 0,
    tracks: filteredTracksSelector(state, filter),
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
