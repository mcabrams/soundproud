import type { Action } from '../actions/types'
import { SHOW_UNARCHIVED } from '../constants/VisibilityFilterConstants'

export default function visibilityFilter(
  state: string = SHOW_UNARCHIVED, action: Action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
