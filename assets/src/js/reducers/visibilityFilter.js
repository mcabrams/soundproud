import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes'
import { SHOW_UNARCHIVED } from '../constants/VisibilityFilterConstants'

type Action = {
  +type: string,
  +filter: string,
}

export default function visibilityFilter(
  state: string = SHOW_UNARCHIVED, action: Action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
