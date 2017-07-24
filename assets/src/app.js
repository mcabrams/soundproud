import React from 'react'
import ReactDOM from 'react-dom'
import Stream from './components/Stream'
import Player from './components/Player'
import {getTracks} from './utils/api'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTrack: null,
      tracks: []
    }

    this.setActiveTrack = this.setActiveTrack.bind(this)
    this.playNextTrack = this.playNextTrack.bind(this)
    this.playFirstTrack = this.playFirstTrack.bind(this)
  }

  componentDidMount() {
    getTracks().then(tracks => {
      this.setState({
        tracks: tracks
      })
    })
  }

  playNextTrack() {
    if (!this.state.activeTrack) {
      return this.playFirstTrack()
    }

    return this.setActiveTrack(this.nextTrack)
  }

  get currentTrackIndex() {
    return this.state.tracks.findIndex(track => {
      return track.gateway_id === this.state.activeTrack.gateway_id
    })
  }

  get nextTrack() {
    return this.state.tracks[this.currentTrackIndex + 1] || this.firstTrack
  }

  get firstTrack() {
    return this.state.tracks[0]
  }

  playFirstTrack() {
    this.setActiveTrack(this.state.tracks[0])
  }

  setActiveTrack(track) {
    this.setState(function() {
      return {
        activeTrack: track
      }
    })
  }

  render() {
    return (
      <div>
        <Stream
          tracks={this.state.tracks}
          setActiveTrack={this.setActiveTrack}
        />
        <Player
          activeTrack={this.state.activeTrack}
          playNextTrack={this.playNextTrack}
        />
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
