import type { TrackAlias } from '../typechecking/aliases'
import type { ArchiveTrackAction } from '../reducers/tracks'

export type Action =
  | { type: '@@INIT' }
  | { type: 'REQUEST_TRACKS',
      page: number
    }
  | { type: 'RECEIVE_TRACKS',
      tracks: Array<TrackAlias>,
      pagesLeft: number,
      pagesLoaded: number,
    }
  | ArchiveTrackAction
  | { type: 'SET_VISIBILITY_FILTER', filter: string }
