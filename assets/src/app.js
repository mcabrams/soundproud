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

  pauseTrack = () => {
    return this.setState(() => {
      return {
        isPaused: true
      }
    })
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
        isPaused: false,
        activeTrack: track
      }
    })
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

  get firstTrack() {
    return this.state.tracks[0]
  }

  render() {
    return (
      <div className='grid'>
        <Header />
        <Stream
          tracks={this.state.tracks}
          setActiveTrack={this.setActiveTrack}
          archiveTrack={this.archiveTrack}
          activeTrack={this.state.activeTrack}
        />
        <div className='grid__player'>
          <Player
            activeTrack={this.state.activeTrack}
            isPaused={this.state.isPaused}
            playNextTrack={this.playNextTrack}
            pauseTrack={this.pauseTrack}
          />
        </div>
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
