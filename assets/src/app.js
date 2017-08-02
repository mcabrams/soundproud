import React from 'react'
import ReactDOM from 'react-dom'
import Stream from './components/Stream'
import Player from './components/Player'
import * as api from './utils/api'
import style from './styles/main.scss'
import { Link, BrowserRouter } from 'react-router-dom'

function Header(props) {
  return (
    <header className='header'>
      <h1 className='header__heading'>
        Soundproud
      </h1>
      <nav className='header__nav'>
        <Link
          className='header__nav-link'
          to='/stream/new'
        >
          Stream
        </Link>
        <Link
          className='header__nav-link'
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
      pagesLeft: null
    }
  }

  loadMoreTracks = () => {
    api.getTracks(this.state.pagesLoaded + 1).then(data => {
      this.setState((prevState) => {
        return {
          tracks: prevState.tracks.concat(data.tracks),
          pagesLoaded: prevState.pagesLoaded + 1,
          pagesLeft: data.pagesLeft
        }
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
      this.setState((prevState) => {
        return {
          tracks: prevState.tracks.filter((t) => t.id !== track.id)
        }
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
      <BrowserRouter>
        <div className='grid'>
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
            setActiveTrack={this.setActiveTrack}
            tracks={this.state.tracks}
          />
          <div className='grid__player'>
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
