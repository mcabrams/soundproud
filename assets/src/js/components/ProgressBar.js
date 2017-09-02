import React from 'react'

type Props = {
  percentComplete: number,
  extraClassNames?: string,
}

export default function ProgressBar({
  percentComplete,
  extraClassNames = '',
}: Props) {
  const percentCompleteStyle = `${percentComplete}%`
  const className = `audio-progress ${extraClassNames}`

  const handleStyle = {
    left: percentCompleteStyle,
  }

  const progressStyle = {
    width: percentCompleteStyle,
  }

  return (
    <div className={className}>
      <div
        className="audio-progress__progress"
        style={progressStyle}
      />
      <div
        className="audio-progress__handle"
        style={handleStyle}
      />
    </div>
  )
}
