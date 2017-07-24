import React from 'react'
import {getTracks} from '../utils/api'

function Track(props) {
  const track = props.track

  return (
    <li>
      <button onClick={props.playTrack.bind(null, track)}>Play</button>
      <span>
        {track.title} - {track.username}
      </span>
    </li>
  )
}

export default class Stream extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
    getTracks().then(tracks => {
      this.setState({
        tracks: tracks
      })
    })
  }

  render() {
    return (
      <ul>
        {this.state.tracks.map(track => {
          return (
            <Track
              key={track.gateway_id}
              track={track}
              playTrack={this.props.setActiveTrack}
            />
          )
        })}
      </ul>
    )
  }
}
