import React from 'react'

function Track(props) {
  const track = props.track

  return (
    <li className='track'
      data-id={track.id}
    >
      <button
        onClick={props.playTrack.bind(null, track)}
        className='play-button'
      >Play</button>
      <button
        onClick={props.archiveTrack.bind(null, track)}
        className='archive-button'
      >Archive</button>
      <span>
        {track.title} - {track.username}
      </span>
    </li>
  )
}

export default function Stream(props) {
  return (
    <ul>
      {props.tracks.map(track => {
        return (
          <Track
            key={track.gateway_id}
            track={track}
            playTrack={props.setActiveTrack}
            archiveTrack={props.archiveTrack}
          />
        )
      })}
    </ul>
  )
}
