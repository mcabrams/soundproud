import React from 'react'
import PropTypes from 'prop-types'
import PausePlayButton from './PausePlayButton'
import TrackByline from './TrackByline'
import ArchiveTrackButton from './ArchiveTrackButton'

function TrackButton(props) {
  const archive = () => props.archiveTrack(props.track)

  return (
    <div className="track__button track__button--archive">
      <ArchiveTrackButton
        archive={archive}
      />
    </div>
  )
}

export default function Track(props) {
  const track = props.track
  const playTrack = () => props.playTrack(track)

  return (
    <li
      className={`track ${(props.isActive && 'track--active')}`}
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

Track.propTypes = {
  archiveTrack: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
  showPauseButton: PropTypes.bool.isRequired,
  track: PropTypes.object.isRequired,
}

TrackButton.propTypes = {
  archiveTrack: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired,
}
