import React from 'react'
import BareIconButton from './BareIconButton'
import PausePlayButton from './PausePlayButton'
import TrackByline from './TrackByline'

export default function Track(props) {
  const track = props.track

  return (
    <li className={'track ' + (props.isActive && 'track--active')}
      data-id={track.id}
    >
      <div className='track__button track__button--pause-play'>
        <PausePlayButton
          showPauseButton={props.showPauseButton}
          play={props.playTrack.bind(null, track)}
          pause={props.pause}
        />
      </div>
      <div className='track__byline'>
        <TrackByline
          track={track}
        />
      </div>
      <div className='track__button track__button--archive'>
        <BareIconButton
          clickHandler={props.archiveTrack.bind(null, track)}
          iconName='archive'
        />
      </div>
    </li>
  )
}

