import React from 'react'
import PropTypes from 'prop-types'

export default function TrackByline(props) {
  return (
    <div className="track-byline">
      <img
        alt={`${props.track.title} artwork`}
        className="track-byline__artwork"
        src={props.track.artwork_url}
      />
      <p className="track-byline__text">
        {props.track.title} - {props.track.username}
      </p>
    </div>
  )
}

TrackByline.propTypes = {
  track: PropTypes.object.isRequired,
}
