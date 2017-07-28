import React from 'react'

function Track(props) {
  const track = props.track

  return (
    <li className={'track ' + (props.isActive && 'track--active')}
      data-id={track.id}
    >
      <button
        onClick={props.playTrack.bind(null, track)}
        className='track__button track__button--play'
      >Play</button>
      <button
        onClick={props.archiveTrack.bind(null, track)}
        className='track__button track__button--archive'
      >Archive</button>
      <span className='track__name'>
        {track.title} - {track.username}
      </span>
    </li>
  )
}

export default function Stream(props) {
  return (
    <ul className='stream'>
      {props.tracks.map(track => {
        return (
          <div
            className='stream__track'
            key={track.gateway_id}
          >
            <Track
              track={track}
              playTrack={props.setActiveTrack}
              archiveTrack={props.archiveTrack}
              isActive={props.activeTrack &&
                        track.id === props.activeTrack.id}
            />
          </div>
        )
      })}
    </ul>
  )
}
