import React from 'react'
import Track from './Track'


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
