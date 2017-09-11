import React from 'react'
import SVGIcon from './SVGIcon'
import '../../images/icons/play.svg'
import '../../images/icons/pause.svg'
import '../../images/icons/skip-previous.svg'
import '../../images/icons/skip-next.svg'
import '../../images/icons/archive.svg'

type Props = {
  isBright?: boolean,
  clickHandler: () => void,
  iconName: string,
  isLarge?: boolean,
}

export default function BareIconButton(props: Props) {
  return (
    <button
      onClick={props.clickHandler}
      className="bare-button"
    >
      <div className="bare-button__content">
        <SVGIcon
          extraClassNames={`bare-button__svg-icon ${props.isBright ? 'bare-button__svg-icon--bright' : ''}`}
          iconName={props.iconName}
          isLarge={props.isLarge}
        />
      </div>
    </button>
  )
}

BareIconButton.defaultProps = {
  isBright: false,
  isLarge: false,
}
