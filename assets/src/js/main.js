import { document } from 'global'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/App'
// $FlowFixMe
import '../styles/main.scss'

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
