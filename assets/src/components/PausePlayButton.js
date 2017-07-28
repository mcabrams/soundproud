import React from 'react'

export default function PausePlayButton(props) {
  if (props.showPauseButton) {
    return (
      <button
        onClick={props.pause}
        className='button button--pause'
      >Pause</button>
    )
  } else {
    return (
      <button
        onClick={props.play}
        className='button button--play'
      >Play</button>
    )
  }
}
