import type {
  Store as ReduxStore,
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
  archived: boolean,
}

import type { Reducers } from '../reducers'

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>

export type Store = ReduxStore<State, Action>

export type GetState = () => State

export type Dispatch =
  & ReduxDispatch<Action>
  & Thunk<Action>

export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A
