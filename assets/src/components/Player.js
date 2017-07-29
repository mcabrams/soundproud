import React from 'react'
import PausePlayButton from './PausePlayButton'
import TrackByline from './TrackByline'

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
        <TrackByline
          title={activeTrack.title}
          author={activeTrack.username}
        />
        <div className="player__button">
          <button
            className="button"
            onClick={this.props.playPreviousTrack}
          >
            Play Previous Song
          </button>
        </div>
        <audio
            ref={audio => this.audio = audio}
            src={activeTrack.stream_url + '?client_id=' + CLIENT_ID}
            onEnded={this.props.playNextTrack}
          >
        </audio>

        <div className="player__button">
          <PausePlayButton
            showPauseButton={!this.props.isPaused}
            play={this.props.play}
            pause={this.props.pause}
          />
        </div>

        <div className="player__button">
          <button
            className="button"
            onClick={this.props.playNextTrack}
          >
            Play Next Song
          </button>
        </div>
      </div>
    )
  }
}
