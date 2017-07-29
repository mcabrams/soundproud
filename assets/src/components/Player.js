import React from 'react'
import PausePlayButton from './PausePlayButton'
import TrackByline from './TrackByline'
import BareIconButton from './BareIconButton'

export default class Player extends React.Component {
  componentDidUpdate() {
    if (this.audio) {

      if (this.props.isPaused) {
        return this.audio.pause()
      }

      this.audio.play()
    }
  }

  render() {
    if (!this.props.activeTrack) {
      return null
    }

    const CLIENT_ID = '9eacf40cd14904ebcabb9e5bd31c3396'
    const activeTrack = this.props.activeTrack
    const streamUrl = activeTrack.stream_url + '?client_id=' + CLIENT_ID

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
              isLarge={true}
              clickHandler={this.props.playPreviousTrack}
              iconName='skip-previous'
            />
          </div>
          <div className="player__button">
            <PausePlayButton
              isLarge={true}
              showPauseButton={!this.props.isPaused}
              play={this.props.play}
              pause={this.props.pause}
            />
          </div>
          <div className="player__button">
            <BareIconButton
              isLarge={true}
              clickHandler={this.props.playNextTrack}
              iconName='skip-next'
            />
          </div>
        </div>
        <div className="player__archive-button">
          <BareIconButton
            isLarge={true}
            clickHandler={this.props.archiveTrack}
            iconName='archive'
          />
        </div>
        <audio
          ref={audio => this.audio = audio}
          src={activeTrack.stream_url + '?client_id=' + CLIENT_ID}
          onEnded={this.props.playNextTrack}
        />
      </div>
    )
  }
}
