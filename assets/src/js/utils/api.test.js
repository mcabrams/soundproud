import axios from 'axios'
// $FlowFixMe
import httpAdapter from 'axios/lib/adapters/http'
import nock from 'nock'
import * as api from './api'

const host = 'http://localhost'
axios.defaults.baseURL = host
axios.defaults.adapter = httpAdapter

describe('archiveTrack', () => {
  const track = { id: 42 }

  it('should send patch request to correct uri', () => {
    const archiveCall = nock(host)
      .patch('/tracks/42/')
      .reply(200, 'foo')

    return api.archiveTrack(track).then(() => {
      expect(archiveCall.isDone()).toBeTruthy()
    })
  })
})

describe('getTracks', () => {
  function getResponseObject(results = [], count = 1) {
    return {
      results,
      count,
    }
  }

  it('should get expected tracks', () => {
    nock(host)
      .get('/tracks/?page=1&archived=false')
      .reply(200, getResponseObject())

    return api.getTracks().then((response) => {
      expect(response.tracks).toEqual([])
    })
  })

  it('should get specific page if passed', () => {
    const call = nock(host)
      .get('/tracks/?page=5&archived=false')
      .reply(200, getResponseObject())

    return api.getTracks(5).then(() => {
      expect(call.isDone()).toBeTruthy()
    })
  })

  describe('should yield correct pages left', () => {
    const countsAndExpecteds = [[0, 0], [1, 0], [10, 0], [11, 1], [21, 2]]
    const testCountYieldsExpected = ([count, expected]) => {
      it(`should have ${expected} pages left when count of ${count}`, () => {
        nock(host)
          .get(/^\/tracks\//)
          .reply(200, getResponseObject([], count))

        return api.getTracks(1).then((response) => {
          expect(response.pagesLeft).toEqual(expected)
        })
      })
    }

    countsAndExpecteds.forEach(testCountYieldsExpected)
  })
})
