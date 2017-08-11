import { document } from 'global'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import App from './components/App'
// $FlowFixMe
import '../styles/main.scss'


/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  // $FlowFixMe
  composeWithDevTools(),
)
/* eslint-enable */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
