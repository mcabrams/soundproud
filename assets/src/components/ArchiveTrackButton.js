import React from 'react'
import PropTypes from 'prop-types'
import BareIconButton from './BareIconButton'

export default function ArchiveTrackButton(props) {
  return (
    <BareIconButton
      isLarge={props.isLarge}
      clickHandler={props.archive}
      iconName="archive"
    />
  )
}

ArchiveTrackButton.propTypes = {
  archive: PropTypes.func.isRequired,
  isLarge: PropTypes.bool,
}
