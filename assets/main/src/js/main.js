import { document } from 'global'
import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { render } from 'react-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import Root from './components/Root'
import { fetchTracks } from './actions/tracks'
// $FlowFixMe
import '../styles/main.scss'


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
)

store.dispatch(fetchTracks())

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app'),
)
