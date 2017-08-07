import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Track from './Track'
import type { TrackAlias } from '../typechecking/aliases'

function StreamTrack(props: {
  activeTrack: ?TrackAlias,
  archiveTrack: (TrackAlias) => void,
  isPaused: boolean,
  pause: () => void,
  playTrack: (TrackAlias) => void,
  track: TrackAlias,
}) {
  const isActive = !!(props.activeTrack &&
                      props.track.id === props.activeTrack.id)
  const showPauseButton: boolean = !!(isActive && !props.isPaused)

  return (
    <div
      className="stream__track"
      key={props.track.gateway_id}
    >
      <Track
        archiveTrack={props.archiveTrack}
        isActive={isActive}
        pause={props.pause}
        playTrack={props.playTrack}
        showPauseButton={showPauseButton}
        track={props.track}
      />
    </div>
  )
}

export default function Stream(props: {
  activeTrack: TrackAlias,
  archiveTrack: (TrackAlias) => void,
  hasMore: boolean,
  isPaused: boolean,
  loadMore: () => void,
  pause: () => void,
  playTrack: (TrackAlias) => void,
  tracks: Array<TrackAlias>,
}) {
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
          {props.tracks.map(track => (
            <StreamTrack
              activeTrack={props.activeTrack}
              archiveTrack={props.archiveTrack}
              isPaused={props.isPaused}
              pause={props.pause}
              playTrack={props.playTrack}
              track={track}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
