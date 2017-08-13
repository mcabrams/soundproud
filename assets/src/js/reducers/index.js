import { combineReducers } from 'redux'
// import player from './player'
import tracks from './tracks'
import visibilityFilter from './visibilityFilter'


const reducers = {
  tracks,
  // player,
  visibilityFilter,
}

export type Reducers = typeof reducers

const rootReducer = combineReducers(reducers)

export default rootReducer
