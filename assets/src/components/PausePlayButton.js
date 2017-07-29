import React from 'react'
import BareIconButton from './BareIconButton'

export default function PausePlayButton(props) {
  if (props.showPauseButton) {
    return (
      <BareIconButton
        clickHandler={props.pause}
        iconName='pause'
        isLarge={props.isLarge}
      />
    )
  } else {
    return (
      <BareIconButton
        clickHandler={props.play}
        iconName='play'
        isLarge={props.isLarge}
      />
    )
  }
}
