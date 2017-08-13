import type {
  Dispatch as ReduxDispatch,
} from 'redux'

import type { Action } from '../actions/types'

export type TrackAlias = {
  created_at: Date,
  updated_at: Date,
  artwork_url: string,
  gateway_id: number,
  id: number,
  stream_url: string,
  title: string,
  username: string,
}

export type Dispatch = ReduxDispatch<Action>
