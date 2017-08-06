import React from 'react'
import PropTypes from 'prop-types'
import '../images/icons/play.svg'
import '../images/icons/pause.svg'
import '../images/icons/skip-previous.svg'
import '../images/icons/skip-next.svg'
import '../images/icons/archive.svg'

export default function BareIconButton(props) {
  return (
    <button
      onClick={props.clickHandler}
      className={`bare-button bare-button--${props.iconName}`}
    >
      <svg
        className={props.isLarge ?
          'bare-button__icon bare-button__icon--large'
          : 'bare-button__icon'
        }
      >
        <use xlinkHref={`#${props.iconName}`} />
      </svg>
    </button>
  )
}

BareIconButton.defaultProps = {
  isLarge: false,
}

BareIconButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  isLarge: PropTypes.bool,
}
