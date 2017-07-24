import React from 'react'
import ReactDOM from 'react-dom'
import Stream from './components/Stream'
import Player from './components/Player'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTrack: null
    }

    this.setActiveTrack = this.setActiveTrack.bind(this)
  }

  setActiveTrack(track) {
    this.setState(function() {
      return {
        activeTrack: track
      }
    })
  }

  render() {
    return (
      <div>
        <Stream setActiveTrack={this.setActiveTrack}/>
        <Player activeTrack={this.state.activeTrack}/>
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
