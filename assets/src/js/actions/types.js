import type { TrackAlias } from '../typechecking/aliases'
import type { ArchiveTrackAction } from '../reducers/tracks'

export type Action =
  | { type: '@@INIT' }
  | { type: 'TRACKS_REQUEST',
      page: number
    }
  | { type: 'TRACKS_RECEIVAL',
      tracks: Array<TrackAlias>,
      pagesLeft: number,
      pagesLoaded: number,
    }
  | ArchiveTrackAction
  | { type: 'SET_VISIBILITY_FILTER', filter: string }
