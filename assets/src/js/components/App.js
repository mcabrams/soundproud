import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import PlayerContainer from '../containers/PlayerContainer'
import StreamContainer from '../containers/StreamContainer'

export default function App() {
  return (
    <BrowserRouter>
      <div className="grid">
        <Header />
        <StreamContainer />
        <div className="grid__player">
          <PlayerContainer />
        </div>
      </div>
    </BrowserRouter>
  )
}
