import React from 'react'

import '../../images/icons/archive.svg'
import '../../images/icons/pause.svg'
import '../../images/icons/play.svg'
import '../../images/icons/replay.svg'
import '../../images/icons/skip-next.svg'
import '../../images/icons/skip-previous.svg'

type Props = {
  extraClassNames?: string,
  iconName: string,
  isLarge?: boolean,
}

export default function SVGIcon({
  extraClassNames = '',
  iconName,
  isLarge = false,
}: Props) {
  let className = `svg-icon svg-icon--${iconName}`
  className += isLarge ? ' svg-icon--large' : ''
  className += ` ${extraClassNames}`

  return (
    <svg className={className}>
      <use xlinkHref={`#${iconName}`} />
    </svg>
  )
}
