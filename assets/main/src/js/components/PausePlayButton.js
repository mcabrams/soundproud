import React from 'react'
import BareIconButton from './BareIconButton'

export default function PausePlayButton(props: {
  showPauseButton: boolean,
  play: () => void,
  pause: () => void,
  isLarge?: boolean,
}) {
  if (props.showPauseButton) {
    return (
      <BareIconButton
        clickHandler={props.pause}
        iconName="pause"
        isLarge={props.isLarge}
      />
    )
  }

  return (
    <BareIconButton
      clickHandler={props.play}
      iconName="play"
      isLarge={props.isLarge}
    />
  )
}

PausePlayButton.defaultProps = {
  isLarge: false,
}
