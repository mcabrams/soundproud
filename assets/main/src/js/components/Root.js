import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import App from './App'

export default function Root() {
  return (
    <BrowserRouter basename="/stream">
      <div>
        <Route exact path="/" component={App} />
        <Route path="/:filter" component={App} />
      </div>
    </BrowserRouter>
  )
}
