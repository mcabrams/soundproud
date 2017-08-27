import React from 'react'
import Header from './Header'
import PlayerContainer from '../containers/PlayerContainer'
import StreamContainer from '../containers/StreamContainer'

export type Props = {
  match: Object,
}

export default function Root({ match }: Props) {
  return (
    <div className="grid">
      <Header />
      <StreamContainer filter={match.params.filter} />
      <div className="grid__player">
        <PlayerContainer />
      </div>
    </div>
  )
}
