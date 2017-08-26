import type { TrackAlias } from '../typechecking/aliases'
import type {
  ArchiveTrackRequestAction,
  ArchiveTrackFailureAction,
  IncrementListenCountRequestAction,
  IncrementListenCountFailureAction,
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
  | IncrementListenCountRequestAction
  | IncrementListenCountFailureAction
  | { type: 'ACTIVE_TRACK_CHANGE',
      trackId: number,
    }
  | { type: 'TOGGLE_PLAYING' }
  | { type: 'SET_PLAYING',
      playing: boolean,
    }
  | { type: 'SET_VISIBILITY_FILTER', filter: string }
