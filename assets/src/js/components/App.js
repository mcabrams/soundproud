import React from 'react'
import Header from './Header'
import TracksProviderContainer from '../containers/TracksProviderContainer'

export type Props = {
  match: Object,
}

export default function Root({ match }: Props) {
  return (
    <div className="grid">
      <Header />
      <TracksProviderContainer filter={match.params.filter} />
    </div>
  )
}
