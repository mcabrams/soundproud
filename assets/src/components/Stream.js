import React from 'react'
import PausePlayButton from './PausePlayButton'
import TrackByline from './TrackByline'
import BareIconButton from './BareIconButton'

function Track(props) {
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

export default function Stream(props) {
  return (
    <ul className='stream'>
      {props.tracks.map(track => {
        const isActive = props.activeTrack && track.id === props.activeTrack.id
        const showPauseButton = isActive && !props.isPaused

        return (
          <div
            className='stream__track'
            key={track.gateway_id}
          >
            <Track
              archiveTrack={props.archiveTrack}
              isActive={isActive}
              pause={props.pause}
              playTrack={props.setActiveTrack}
              showPauseButton={showPauseButton}
              track={track}
            />
          </div>
        )
      })}
    </ul>
  )
}
