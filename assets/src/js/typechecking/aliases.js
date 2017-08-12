import type {
  Dispatch as ReduxDispatch,
} from 'redux'

export type TrackAlias = {
  artwork_url: string,
  gateway_id: number,
  id: number,
  stream_url: string,
  title: string,
  username: string,
}

export type Action = {
  type: string,
}

export type Dispatch = ReduxDispatch<Action>
