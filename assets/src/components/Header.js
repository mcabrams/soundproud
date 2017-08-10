import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__heading">
        Soundproud
      </h1>
      <nav className="header__nav">
        <Link
          className="header__nav-link"
          to="/stream/new"
        >
          Stream
        </Link>
        <Link
          className="header__nav-link"
          to="/stream/archive"
        >
          Archived
        </Link>
      </nav>
    </header>
  )
}
