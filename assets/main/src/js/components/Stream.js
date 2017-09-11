import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import type { TrackAlias } from '../typechecking/aliases'
import StreamTrackContainer from '../containers/StreamTrackContainer'

export type StreamPropsType = {
  hasMore: boolean,
  loadMore: () => void,
  tracks: Array<TrackAlias>,
}

export default function Stream(props: StreamPropsType) {
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
            <StreamTrackContainer
              key={track.id}
              track={track}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
