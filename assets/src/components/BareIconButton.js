import React from 'react'
import play from '../images/icons/play.svg'
import pause from '../images/icons/pause.svg'
import skipPrevious from '../images/icons/skip-previous.svg'
import skipNext from '../images/icons/skip-next.svg'
import archive from '../images/icons/archive.svg'

export default function BareIconButton(props) {
  return (
    <button
      onClick={props.clickHandler}
      className={'bare-button bare-button' + '--' + props.iconName}
    >
      <svg className={props.isLarge ?
                      'bare-button__icon bare-button__icon--large'
                      : 'bare-button__icon'}>
        <use xlinkHref={'#' + props.iconName} />
      </svg>
    </button>
  )
}
