import React from 'react'
import PausePlayButton from './PausePlayButton'
import TrackByline from './TrackByline'
import ArchiveTrackButton from './ArchiveTrackButton'
import type { TrackAlias } from '../typechecking/aliases'

function TrackButton(props: {
  track: TrackAlias, archiveTrack: (TrackAlias) => void, }) {
  const archive = () => props.archiveTrack(props.track)

  return (
    <div className="track__button track__button--archive">
      <ArchiveTrackButton
        archive={archive}
      />
    </div>
  )
}

export default function Track(props: {
  archiveTrack: (TrackAlias) => void, isActive: boolean, pause: () => void,
  playTrack: (TrackAlias) => void, showPauseButton: boolean, track: TrackAlias,
}) {
  const track = props.track
  const playTrack = () => props.playTrack(track)
  const additionalClasses = props.isActive ? 'track--active' : ''

  return (
    <li
      className={`track ${additionalClasses}`}
      data-id={track.id}
    >
      <div
        className="track__button track__button--pause-play"
      >
        <PausePlayButton
          showPauseButton={props.showPauseButton}
          play={playTrack}
          pause={props.pause}
        />
      </div>
      <div className="track__byline">
        <TrackByline
          track={track}
        />
      </div>
      <TrackButton
        classModifier="archive"
        track={track}
        archiveTrack={props.archiveTrack}
      />
    </li>
  )
}
