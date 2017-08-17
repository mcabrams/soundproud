import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import Stream from '../components/Stream'
import type { StreamPropsType } from '../components/Stream'
import { fetchTracks } from '../actions/tracks'
import type { TrackAlias } from '../typechecking/aliases'

type OwnProps = { tracks: Array<TrackAlias> }

const mapStateToProps = (state, { tracks }: OwnProps) => {
  const { tracks: { pagesLeft } } = state

  return {
    hasMore: pagesLeft > 0,
    tracks,
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
