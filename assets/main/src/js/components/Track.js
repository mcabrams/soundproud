import React from 'react'
import PausePlayButton from './PausePlayButton'
import BareIconButton from './BareIconButton'
import TrackByline from './TrackByline'
import type { TrackAlias } from '../typechecking/aliases'

type TrackButtonProps = {
  archiveTrack: (TrackAlias) => void,
  track: TrackAlias,
}

function ArchiveTrackButton({ archiveTrack, track }: TrackButtonProps) {
  const archive = () => archiveTrack(track)

  return (
    <div className="track__button track__button--archive">
      <BareIconButton
        isBright
        clickHandler={archive}
        iconName="archive"
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
      <div className="track__main-content">
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
        <ArchiveTrackButton
          track={track}
          archiveTrack={props.archiveTrack}
        />
      </div>
      <div className="track__actions-and-info">
        <span className="track__listen-count">
          {track.listen_count} {track.listen_count === 1 ? 'play' : 'plays' }
        </span>
      </div>
    </li>
  )
}
