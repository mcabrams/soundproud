import React from 'react'

export default class Player extends React.Component {
  componentDidUpdate() {
    if (this.audio) {
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
      <div>
          <p>Currently playing: {activeTrack.title}</p>
        <audio
            controls
            ref={audio => this.audio = audio}
            src={activeTrack.stream_url + '?client_id=' + CLIENT_ID}
          >
        </audio>
      </div>
    )
  }
}
