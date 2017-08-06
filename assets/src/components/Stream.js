import React from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import Track from './Track'


function StreamTrack(props) {
  return (
    <div
      className="stream__track"
      key={props.track.gateway_id}
    >
      <Track
        archiveTrack={props.archiveTrack}
        isActive={props.isActive}
        pause={props.pause}
        playTrack={props.setActiveTrack}
        showPauseButton={props.showPauseButton}
        track={props.track}
      />
    </div>
  )
}

export default function Stream(props) {
  return (
    <div className="stream">
      <InfiniteScroll
        pageStart={0}
        loadMore={props.loadMore}
        hasMore={props.hasMore}
        loader={<div className="loader">Loading ...</div>}
        useWindow
      >
        <ul className="stream__tracks">
          {props.tracks.map((track) => {
            const isActive = props.activeTrack && track.id === props.activeTrack.id
            const showPauseButton = isActive && !props.isPaused

            return (
              <StreamTrack
                archiveTrack={props.archiveTrack}
                isActive={isActive}
                pause={props.pause}
                setActiveTrack={props.setActiveTrack}
                showPauseButton={showPauseButton}
                track={track}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

StreamTrack.propTypes = {
  archiveTrack: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  setActiveTrack: PropTypes.func.isRequired,
  showPauseButton: PropTypes.bool.isRequired,
  track: PropTypes.object.isRequired,
}

Stream.propTypes = {
  activeTrack: PropTypes.object.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  setActiveTrack: PropTypes.func.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
}
