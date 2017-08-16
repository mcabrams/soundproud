import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import Stream from '../components/Stream'
import type { StreamPropsType } from '../components/Stream'
import { fetchTracks } from '../actions/tracks'


const mapStateToProps = (state) => {
  const { tracks: { allIds, byId, pagesLeft } } = state

  const tracks = allIds.reduce(
    (accumulator, id) => [...accumulator, byId[id]],
    [],
  )

  return {
    hasMore: pagesLeft > 0,
    tracks,
  }
}

const mapDispatchToProps = (dispatch: *) => ({
  loadMore: () => dispatch(fetchTracks()),
})

const connector: Connector<{}, StreamPropsType> = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const StreamContainer = connector(Stream)

export default StreamContainer
