import type { TrackAlias } from '../typechecking/aliases'
import type {
  ActiveTrackChange,
  ArchiveTrackRequestAction,
  ArchiveTrackFailureAction,
} from '../reducers/tracks'

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
  | ArchiveTrackRequestAction
  | ArchiveTrackFailureAction
  | ActiveTrackChange
  | { type: 'SET_VISIBILITY_FILTER', filter: string }
