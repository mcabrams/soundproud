import React from 'react'

function Track(props) {
  const track = props.track

  return (
    <li className='track'>
      <button onClick={props.playTrack.bind(null, track)}>Play</button>
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
          />
        )
      })}
    </ul>
  )
}
