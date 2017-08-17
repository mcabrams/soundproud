import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import Player from '../components/Player'
import { archiveTrack as archiveTrackWithId } from '../actions/tracks'
import { setActiveTrackId, setPlaying, setPaused } from '../actions/player'
import type { PlayerPropsType } from '../components/Player'
import type { TrackAlias } from '../typechecking/aliases'

type OwnProps = { tracks: Array<TrackAlias> }

const mapStateToProps = (state) => {
  const { player: { isPlaying, activeTrackId } } = state
  const { tracks: { byId, allIds } } = state
  const activeTrack = byId[activeTrackId]

  return {
    activeTrack,
    isPlaying,
    trackIds: allIds,
  }
}

const mapDispatchToProps = (dispatch: *) => {
  const archiveTrack = (track: TrackAlias) => {
    dispatch(archiveTrackWithId(track.id))
  }

  return {
    archiveTrack,
    play: () => { dispatch(setPlaying()) },
    pause: () => { dispatch(setPaused()) },
    setActiveTrackId: (id) => { dispatch(setActiveTrackId(id)) },
  }
}

const connector: Connector<OwnProps, PlayerPropsType> = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const PlayerContainer = connector(Player)

export default PlayerContainer
