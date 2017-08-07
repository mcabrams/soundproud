import React from 'react'
import ReactDOM from 'react-dom'
import { Link, BrowserRouter } from 'react-router-dom'
import Stream from './components/Stream'
import Player from './components/Player'
import * as api from './utils/api'
// $FlowFixMe
import './styles/main.scss'

function Header() {
  return (
    <header className="header">
      <h1 className="header__heading">
        Soundproud
      </h1>
      <nav className="header__nav">
        <Link
          className="header__nav-link"
          to="/stream/new"
        >
          Stream
        </Link>
        <Link
          className="header__nav-link"
          to="/stream/archive"
        >
          Archived
        </Link>
      </nav>
    </header>
  )
}

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPaused: null,
      activeTrack: null,
      tracks: [],
      pagesLoaded: 0,
      pagesLeft: null,
    }
  }

  setIsPaused = (isPaused) => {
    this.setState(() => ({
      isPaused,
    }))
  }

  setActiveTrack = (track) => {
    this.setState(() => ({
      activeTrack: track,
    }))
  }

  playTrack = (track) => {
    this.setActiveTrack(track)
    this.play()
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

    return this.playTrack(this.previousTrack)
  }

  playNextTrack = () => {
    if (!this.state.activeTrack) {
      return this.playFirstTrack()
    }

    return this.playTrack(this.nextTrack)
  }

  playFirstTrack = () => {
    this.playTrack(this.firstTrack)
  }

  loadMoreTracks = () => {
    api.getTracks(this.state.pagesLoaded + 1).then((data) => {
      this.setState(prevState => ({
        tracks: prevState.tracks.concat(data.tracks),
        pagesLoaded: prevState.pagesLoaded + 1,
        pagesLeft: data.pagesLeft,
      }))
    })
  }

  archiveTrack = (track) => {
    api.archiveTrack(track).then(() => {
      this.setState(prevState => ({
        tracks: prevState.tracks.filter(t => t.id !== track.id),
      }))

      if (this.state.isPaused) {
        this.setActiveTrack(this.nextTrack)
      } else {
        this.playNextTrack()
      }
    })
  }

  get currentTrackIndex() {
    return this.state.tracks.findIndex(track => (
      track.gateway_id === this.state.activeTrack.gateway_id
    ))
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
      <BrowserRouter>
        <div className="grid">
          <Header />
          <Stream
            activeTrack={this.state.activeTrack}
            archiveTrack={this.archiveTrack}
            hasMore={this.state.pagesLeft === null ||
                     this.state.pagesLeft > 0}
            isPaused={this.state.isPaused}
            loadMore={this.loadMoreTracks}
            pagesLoaded={this.state.pagesLoaded}
            pause={this.pause}
            playTrack={this.playTrack}
            tracks={this.state.tracks}
          />
          <div className="grid__player">
            <Player
              activeTrack={this.state.activeTrack}
              archiveTrack={this.archiveTrack}
              isPaused={this.state.isPaused}
              pause={this.pause}
              play={this.play}
              playNextTrack={this.playNextTrack}
              playPreviousTrack={this.playPreviousTrack}
            />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
