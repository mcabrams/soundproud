import { document } from 'global'
import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { render } from 'react-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import App from './components/App'
import { fetchTracks } from './actions/tracks'
// $FlowFixMe
import '../styles/main.scss'


/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
)
/* eslint-enable */

store.dispatch(fetchTracks())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
