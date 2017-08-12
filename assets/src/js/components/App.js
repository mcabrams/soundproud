import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import Player from './Player'
import Stream from './Stream'
import * as api from '../utils/api'
import type { TrackAlias } from '../typechecking/aliases'

export default class App extends React.Component {
  state: {
    isPaused: boolean,
    activeTrack: ?TrackAlias,
    tracks: Array<TrackAlias>,
    pagesLoaded: ?number,
    pagesLeft: ?number,
  }

  constructor() {
    super()

    this.state = {
      isPaused: false,
      activeTrack: null,
      tracks: [],
      pagesLoaded: 0,
      pagesLeft: null,
    }
  }

  setIsPaused = (isPaused: boolean): void => {
    this.setState(() => ({
      isPaused,
    }))
  }

  setActiveTrack = (track: TrackAlias): void => {
    this.setState(() => ({
      activeTrack: track,
    }))
  }

  playTrack = (track: TrackAlias): void => {
    this.setActiveTrack(track)
    this.play()
  }

  pause = (): void => {
    this.setIsPaused(true)
  }

  play = (): void => {
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

  playFirstTrack = (): void => {
    this.playTrack(this.firstTrack)
  }

  loadMoreTracks = (): void => {
    api.fetchTracksData(this.state.pagesLoaded + 1).then((data) => {
      this.setState(prevState => ({
        tracks: prevState.tracks.concat(data.tracks),
        pagesLoaded: prevState.pagesLoaded + 1,
        pagesLeft: data.pagesLeft,
      }))
    })
  }

  archiveTrack = (track: TrackAlias): void => {
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

  get currentTrackIndex(): number {
    const activeTrack = this.state.activeTrack

    if (!activeTrack) {
      return 0
    }

    return this.state.tracks.findIndex(track => (
      track.gateway_id === activeTrack.gateway_id
    ))
  }

  get nextTrack(): TrackAlias {
    return this.state.tracks[this.currentTrackIndex + 1] || this.firstTrack
  }

  get previousTrack(): TrackAlias {
    return this.state.tracks[this.currentTrackIndex - 1] || this.lastTrack
  }

  get firstTrack(): TrackAlias {
    return this.state.tracks[0]
  }

  get lastTrack(): TrackAlias {
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
            hasMore={this.state.pagesLeft == null ||
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
