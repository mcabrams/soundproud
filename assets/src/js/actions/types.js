import type { TrackAlias } from '../typechecking/aliases'
import type {
  ArchiveTrackRequestAction,
  ArchiveTrackFailureAction,
  IncrementListenCountRequestAction,
  IncrementListenCountFailureAction,
} from '../reducers/tracks'

import type {
  ActiveTrackChangeAction,
  TogglePlayingAction,
  SetCurrentTimeAction,
  SetPlayingAction,
} from '../reducers/player'

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
  | ActiveTrackChangeAction
  | TogglePlayingAction
  | SetCurrentTimeAction
  | SetPlayingAction
  | { type: 'SET_VISIBILITY_FILTER', filter: string }
