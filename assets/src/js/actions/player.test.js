import * as actions from './player'
import { trackFactory } from '../test/factories'

describe('set active track id action creator', () => {
  const tracks = [trackFactory(), trackFactory()]

  it('should return proper action', () => {
    expect(actions.setActiveTrackId(tracks[0].id)).toEqual({
      type: 'ACTIVE_TRACK_CHANGE',
      trackId: tracks[0].id,
    })
  })
})

