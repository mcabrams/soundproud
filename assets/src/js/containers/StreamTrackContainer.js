import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import StreamTrack from '../components/StreamTrack'
import type { StreamTrackPropsType } from '../components/StreamTrack'
import { archiveTrack as archiveTrackWithId } from '../actions/tracks'
import { setActiveTrackId, setPaused, setPlaying } from '../actions/player'
import type { Dispatch, TrackAlias } from '../typechecking/aliases'


type OwnProps = {
  track: TrackAlias,
}

const mapStateToProps = (state, ownProps: OwnProps) => {
  const { player: { isPlaying, activeTrackId } } = state
  const { tracks: { byId } } = state
  const activeTrack = byId[activeTrackId]

  const isActive = !!(activeTrack && ownProps.track.id === activeTrack.id)
  const showPauseButton: boolean = !!(isActive && isPlaying)

  return {
    isActive,
    showPauseButton,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  const archiveTrack = (track: TrackAlias) => {
    dispatch(archiveTrackWithId(track.id))
  }

  return {
    archiveTrack,
    pause: () => { dispatch(setPaused()) },
    playTrack: (track: TrackAlias) => {
      dispatch(setActiveTrackId(track.id))
      dispatch(setPlaying())
    },
  }
}

const connector: Connector<OwnProps, StreamTrackPropsType> = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const StreamTrackContainer = connector(StreamTrack)

export default StreamTrackContainer
