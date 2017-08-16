import nock from 'nock'
import { host } from '../test/axios'
import * as api from './api'
import * as factories from '../test/factories'

afterEach(() => {
  nock.cleanAll()
})

describe('archiveTrackWithId', () => {
  const trackId = 42

  it('should send patch request to correct uri', () => {
    const archiveCall = nock(host)
      .patch('/tracks/42/')
      .reply(200, 'foo')

    return api.archiveTrackWithId(trackId).then(() => {
      expect(archiveCall.isDone()).toBeTruthy()
    })
  })
})

describe('fetchTracksData', () => {
  function responseObject(results = [], count = 1) {
    return {
      results,
      count,
    }
  }

  it('should get expected tracks', () => {
    nock(host)
      .get('/tracks/?page=1')
      .reply(200, responseObject())

    return api.fetchTracksData().then((response) => {
      expect(response.tracks).toEqual([])
    })
  })

  it('should get specific page if passed', () => {
    const call = nock(host)
      .get('/tracks/?page=5')
      .reply(200, responseObject())

    return api.fetchTracksData(5).then(() => {
      expect(call.isDone()).toBeTruthy()
    })
  })

  describe('should yield correct pages left', () => {
    const countsAndExpecteds = [[0, 0], [1, 0], [10, 0], [11, 1], [21, 2]]
    const testCountYieldsExpected = ([count, expected]) => {
      it(`should have ${expected} pages left when count of ${count}`, () => {
        nock(host)
          .get(/^\/tracks\//)
          .reply(200, responseObject([], count))

        return api.fetchTracksData(1).then((response) => {
          expect(response.pagesLeft).toEqual(expected)
        })
      })
    }

    countsAndExpecteds.forEach(testCountYieldsExpected)
  })

  it('should transform tracks dates appropriately', () => {
    const createdAtAndUpdatedAts = [
      ['2017-08-12T21:17:19.699Z', '2017-08-12T21:18:36.088Z'],
      ['2017-08-12T21:18:50.880Z', '2017-08-12T21:19:24.552Z'],
    ]
    const tracks = createdAtAndUpdatedAts.map(pair => (
      factories.apiTrackFactory({
        createdAt: pair[0],
        updatedAt: pair[1],
      })
    ))

    nock(host)
      .get('/tracks/?page=1')
      .reply(200, responseObject(tracks))

    return api.fetchTracksData().then((response) => {
      const dates = response.tracks.map(track => (
        [track.created_at, track.updated_at]
      ))
      expect(dates).toEqual([
        [new Date(1502572639699), new Date(1502572716088)],
        [new Date(1502572730880), new Date(1502572764552)],
      ])
    })
  })
})
