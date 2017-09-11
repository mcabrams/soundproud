import filteredTracksSelector from './tracks'
import { trackFactory } from '../test/factories'

describe('filteredTracksSelector', () => {
  const archivedTrack = trackFactory({ archived: true })
  const unarchivedTrack = trackFactory({ archived: false })
  const tracks = [archivedTrack, unarchivedTrack]
  const state = {
    tracks: {
      byId: {
        [tracks[0].id]: tracks[0],
        [tracks[1].id]: tracks[1],
      },
      allIds: [tracks[0].id, tracks[1].id],
    },
  }

  it('should filter all tracks', () => {
    expect(filteredTracksSelector(state, 'all')).toEqual(tracks)
  })

  it('should filter archived tracks', () => {
    expect(filteredTracksSelector(state, 'archived')).toEqual([archivedTrack])
  })

  it('should filter unarchived tracks', () => {
    expect(filteredTracksSelector(state, 'unarchived'))
      .toEqual([unarchivedTrack])
  })

  it('should filter unarchived tracks if unknown filter', () => {
    expect(filteredTracksSelector(state, 'afdsljk'))
      .toEqual([unarchivedTrack])
  })
})
