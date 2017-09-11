import React from 'react'
import PausePlayButton from './PausePlayButton'
import TrackByline from './TrackByline'
import BareIconButton from './BareIconButton'
import ProgressBar from './ProgressBar'
import { nextTrackId, previousTrackId } from '../selectors/player'
import type { TrackAlias } from '../typechecking/aliases'

export type PlayerPropsType = {
  archiveTrack: (TrackAlias) => void,
  activeTrack: ?TrackAlias,
  currentTime: number,
  duration: number,
  isPlaying: boolean,
  onTimeUpdate: (number, number) => void,
  onProgress: (number, number) => void,
  play: () => void,
  pause: () => void,
  setActiveTrackId: (number) => void,
  trackIds: Array<number>,
}

export default class Player extends React.Component {
  audio: HTMLAudioElement
  props: PlayerPropsType

  componentDidUpdate() {
    if (!this.audio) {
      return
    }

    if (!this.props.isPlaying) {
      this.audio.pause()
      return
    }

    this.audio.play()
  }

  archiveCurrentlyPlayingTrack = (): void => {
    if (!this.props.activeTrack) {
      return
    }

    this.props.archiveTrack(this.props.activeTrack)
  }

  onProgress = () => {
    this.props.onProgress(this.audio.currentTime, this.audio.duration)
  }

  onTimeUpdate = () => {
    this.props.onTimeUpdate(this.audio.currentTime, this.audio.duration)
  }

  playNextTrack = () => {
    const activeTrackId = (this.props.activeTrack
      ? this.props.activeTrack.id : null)
    const id = nextTrackId(activeTrackId, this.props.trackIds)

    if (id) {
      this.props.setActiveTrackId(id)
    }
  }

  playPreviousTrack = () => {
    const activeTrackId = (this.props.activeTrack
      ? this.props.activeTrack.id : null)
    const id = previousTrackId(activeTrackId, this.props.trackIds)

    if (id != null) {
      this.props.setActiveTrackId(id)
    }
  }

  render() {
    if (!this.props.activeTrack) {
      return null
    }

    const CLIENT_ID = '9eacf40cd14904ebcabb9e5bd31c3396'
    const activeTrack = this.props.activeTrack
    const streamUrl = `${activeTrack.stream_url}?client_id=${CLIENT_ID}`

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
              isLarge
              clickHandler={this.playPreviousTrack}
              iconName="skip-previous"
            />
          </div>
          <div className="player__button">
            <PausePlayButton
              isLarge
              showPauseButton={this.props.isPlaying}
              play={this.props.play}
              pause={this.props.pause}
            />
          </div>
          <div className="player__button">
            <BareIconButton
              isLarge
              clickHandler={this.playNextTrack}
              iconName="skip-next"
            />
          </div>
        </div>
        <div className="player__archive-button">
          <BareIconButton
            isLarge
            clickHandler={this.archiveCurrentlyPlayingTrack}
            iconName="archive"
          />
        </div>
        <audio
          ref={(audio) => { this.audio = audio }}
          src={streamUrl}
          onEnded={this.playNextTrack}
          onTimeUpdate={this.onTimeUpdate}
          onProgress={this.onProgress}
        />
        <ProgressBar
          percentComplete={100 * (this.props.currentTime / this.props.duration)}
          extraClassNames="player__audio-progress"
        />
      </div>
    )
  }
}
