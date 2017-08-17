import React from 'react'
import type { TrackAlias } from '../typechecking/aliases'
import PlayerContainer from '../containers/PlayerContainer'
import StreamContainer from '../containers/StreamContainer'

export type Props = {
  tracks: Array<TrackAlias>,
}

export default function TracksProvider(props: Props) {
  return (
    <div>
      <StreamContainer tracks={props.tracks} />
      <div className="grid__player">
        <PlayerContainer tracks={props.tracks} />
      </div>
    </div>
  )
}
