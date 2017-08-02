import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Track from './Track'


export default function Stream(props) {
  const content = (
    <ul className="stream__tracks">
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

  return (
    <div className='stream'>
      <InfiniteScroll
        pageStart={0}
        loadMore={props.loadMore}
        hasMore={props.hasMore}
        loader={<div className='loader'>Loading ...</div>}
        useWindow={true}
      >
        {content}
      </InfiniteScroll>
    </div>
  )
}
