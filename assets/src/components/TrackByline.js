import React from 'react'

export default function TrackByline(props) {
  return (
    <div className='track-byline'>
      <img
        className='track-byline__artwork'
        src={props.track.artwork_url}
      />
      <p className='track-byline__text'>
        {props.track.title} - {props.track.username}
      </p>
    </div>
  )
}
