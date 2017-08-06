import React from 'react'
import PropTypes from 'prop-types'
import BareIconButton from './BareIconButton'

export default function PausePlayButton(props) {
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

PausePlayButton.propTypes = {
  showPauseButton: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  isLarge: PropTypes.bool,
}
