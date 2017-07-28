import React from 'react'

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
        <p className="player__track-info">
          Currently playing: {activeTrack.title}
        </p>
        <button
          onClick={this.props.playPreviousTrack}
        >
          Play Previous Song
        </button>
        <audio
            ref={audio => this.audio = audio}
            src={activeTrack.stream_url + '?client_id=' + CLIENT_ID}
            onEnded={this.props.playNextTrack}
          >
        </audio>
        <button
          onClick={this.props.pauseTrack}
        >
          Pause Song
        </button>
        <button
          onClick={this.props.playNextTrack}
        >
          Play Next Song
        </button>
      </div>
    )
  }
}
