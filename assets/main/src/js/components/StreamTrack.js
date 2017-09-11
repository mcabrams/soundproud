import React from 'react'
import Track from './Track'
import type { TrackAlias } from '../typechecking/aliases'

export type StreamTrackPropsType = {
  archiveTrack: (TrackAlias) => void,
  isActive: boolean,
  pause: () => void,
  playTrack: (TrackAlias) => void,
  showPauseButton: boolean,
  track: TrackAlias,
}

export default function StreamTrack(props: StreamTrackPropsType) {
  return (
    <div
      className="stream__track"
      key={props.track.gateway_id}
    >
      <Track
        archiveTrack={props.archiveTrack}
        isActive={props.isActive}
        pause={props.pause}
        playTrack={props.playTrack}
        showPauseButton={props.showPauseButton}
        track={props.track}
      />
    </div>
  )
}
