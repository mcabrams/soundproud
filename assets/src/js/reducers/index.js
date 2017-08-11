import { combineReducers } from 'redux'
// import player from './player'
import tracks from './tracks'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  tracks,
  // player,
  visibilityFilter,
})

export default rootReducer
