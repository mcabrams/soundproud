import React from 'react'
import BareIconButton from './BareIconButton'

export default function ArchiveTrackButton(
  props: { archive: () => void, isLarge?: boolean }) {
  return (
    <BareIconButton
      isLarge={props.isLarge}
      clickHandler={props.archive}
      iconName="archive"
    />
  )
}

ArchiveTrackButton.defaultProps = {
  isLarge: false,
}
