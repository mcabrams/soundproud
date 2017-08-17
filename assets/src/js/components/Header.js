import React from 'react'
import StreamFilterLink from './StreamFilterLink'

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__heading">
        Soundproud
      </h1>
      <nav className="header__nav">
        <div className="header__nav-link">
          <StreamFilterLink
            filter="all"
          >
            All
          </StreamFilterLink>
        </div>
        <div className="header__nav-link">
          <StreamFilterLink
            filter="unarchived"
          >
            Unarchived
          </StreamFilterLink>
        </div>
        <div className="header__nav-link">
          <StreamFilterLink
            filter="archived"
          >
            Archived
          </StreamFilterLink>
        </div>
      </nav>
    </header>
  )
}
