import React from 'react'
import PropTypes from 'prop-types'
import PausePlayButton from './PausePlayButton'
import TrackByline from './TrackByline'
import BareIconButton from './BareIconButton'
import ArchiveTrackButton from './ArchiveTrackButton'

export default class Player extends React.Component {
  componentDidUpdate() {
    if (!this.audio) {
      return
    }

    if (this.props.isPaused) {
      this.audio.pause()
      return
    }

    this.audio.play()
  }

  archiveCurrentlyPlayingTrack = () => {
    this.props.archiveTrack(this.props.activeTrack)
  }

  render() {
    if (!this.props.activeTrack) {
      return null
    }

    const CLIENT_ID = '9eacf40cd14904ebcabb9e5bd31c3396'
    const activeTrack = this.props.activeTrack
    const streamUrl = `${activeTrack.stream_url}?client_id=${CLIENT_ID}`

    return (
      <div className="player">
        <div className="player__track-byline">
          <TrackByline
            track={activeTrack}
          />
        </div>
        <div className="player__button-group">
          <div className="player__button">
            <BareIconButton
              isLarge
              clickHandler={this.props.playPreviousTrack}
              iconName="skip-previous"
            />
          </div>
          <div className="player__button">
            <PausePlayButton
              isLarge
              showPauseButton={!this.props.isPaused}
              play={this.props.play}
              pause={this.props.pause}
            />
          </div>
          <div className="player__button">
            <BareIconButton
              isLarge
              clickHandler={this.props.playNextTrack}
              iconName="skip-next"
            />
          </div>
        </div>
        <div className="player__archive-button">
          <ArchiveTrackButton
            isLarge
            archive={this.archiveCurrentlyPlayingTrack}
          />
        </div>
        <audio
          ref={(audio) => { this.audio = audio }}
          src={streamUrl}
          onEnded={this.props.playNextTrack}
        />
      </div>
    )
  }
}

Player.propTypes = {
  archiveTrack: PropTypes.func.isRequired,
  activeTrack: PropTypes.object.isRequired,
  isPaused: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  playNextTrack: PropTypes.func.isRequired,
  playPreviousTrack: PropTypes.func.isRequired,
}
