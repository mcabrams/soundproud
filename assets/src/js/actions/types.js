import type { TrackAlias } from '../typechecking/aliases'

export type Action =
  | { type: '@@INIT' }
  | { type: 'REQUEST_TRACKS', tracks?: Array<TrackAlias> }
  | { type: 'RECEIVE_TRACKS',
      tracks?: Array<TrackAlias>,
      pagesLeft: number,
    }
  | { type: 'SET_VISIBILITY_FILTER', filter: string }
