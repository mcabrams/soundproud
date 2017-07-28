import React from 'react'
import ReactDOM from 'react-dom'
import Stream from './components/Stream'
import Player from './components/Player'
import * as api from './utils/api'
import style from './styles/main.scss'

function Header(props) {
  return (
    <div className='header'>
      <h1 className='header__heading'>
        Soundproud
      </h1>
    </div>
  )
}

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPaused: null,
      activeTrack: null,
      tracks: []
    }
  }

  componentDidMount() {
    api.getTracks().then(tracks => {
      this.setState({
        tracks: tracks
      })
    })
  }

  setIsPaused = (isPaused) => {
    return this.setState(() => {
      return {
        isPaused: isPaused
      }
    })
  }

  pause = () => {
    this.setIsPaused(true)
  }

  play = () => {
    this.setIsPaused(false)
  }

  playPreviousTrack = () => {
    if (!this.state.activeTrack) {
      return this.playFirstTrack()
    }

    return this.setActiveTrack(this.previousTrack)
  }

  playNextTrack = () => {
    if (!this.state.activeTrack) {
      return this.playFirstTrack()
    }

    return this.setActiveTrack(this.nextTrack)
  }

  playFirstTrack = () => {
    this.setActiveTrack(this.firstTrack)
  }

  setActiveTrack = (track) => {
    this.setState(function() {
      return {
        activeTrack: track
      }
    })

    this.play()
  }

  archiveTrack = (track) => {
    api.archiveTrack(track).then(() => {
      api.getTracks().then(tracks => {
        this.setState({
          tracks: tracks
        })
      })
    })
  }

  get currentTrackIndex() {
    return this.state.tracks.findIndex(track => {
      return track.gateway_id === this.state.activeTrack.gateway_id
    })
  }

  get nextTrack() {
    return this.state.tracks[this.currentTrackIndex + 1] || this.firstTrack
  }

  get previousTrack() {
    return this.state.tracks[this.currentTrackIndex - 1] || this.lastTrack
  }

  get firstTrack() {
    return this.state.tracks[0]
  }

  get lastTrack() {
    return this.state.tracks.slice(-1)[0]
  }

  render() {
    return (
      <div className='grid'>
        <Header />
        <Stream
          activeTrack={this.state.activeTrack}
          archiveTrack={this.archiveTrack}
          isPaused={this.state.isPaused}
          pause={this.pause}
          setActiveTrack={this.setActiveTrack}
          tracks={this.state.tracks}
        />
        <div className='grid__player'>
          <Player
            activeTrack={this.state.activeTrack}
            isPaused={this.state.isPaused}
            pause={this.pause}
            play={this.play}
            playNextTrack={this.playNextTrack}
            playPreviousTrack={this.playPreviousTrack}
          />
        </div>
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
