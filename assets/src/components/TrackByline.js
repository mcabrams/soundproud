import React from 'react'

export default function TrackByline(props) {
  return (
    <div className='track-byline'>
      <img
        className='track-byline__artwork'
        src="http://placehold.it/50x50.jpg"
      />
      <p className='track-byline__text'>
        {props.title} - {props.author}
      </p>
    </div>
  )
}
