import axios from 'axios'
import * as api from './api'

describe('archiveTrack', () => {
  const track = { id: 42 }

  beforeEach(() => {
    jest.spyOn(axios, 'patch').mockImplementation(jest.fn())
  })

  it('should call axios.patch correctly', () => {
    api.archiveTrack(track)

    expect(axios.patch).toHaveBeenCalledWith('/tracks/42/', {
      archived: true,
    })
  })

  it('should return axios.patch correctly', () => {
    // $FlowFixMe
    expect(api.archiveTrack(track)).toEqual(axios.patch())
  })
})

describe('getTracks', () => {
  function getResponseObject(count) {
    return {
      data: {
        results: [],
        count,
      },
    }
  }

  beforeEach(() => {
    const getMock = jest.fn(() => Promise.resolve(getResponseObject(13)))
    jest.spyOn(axios, 'get').mockImplementation(getMock)
  })

  it('should call axios.get with default page if omitted', () => {
    api.getTracks()

    expect(axios.get).toHaveBeenCalledWith('/tracks/?page=1&archived=false')
  })

  it('should call axios.get with page if provided', () => {
    api.getTracks(5)

    expect(axios.get).toHaveBeenCalledWith('/tracks/?page=5&archived=false')
  })

  describe('should yield correct pages left', () => {
    const countsAndExpecteds = [[0, 0], [1, 0], [10, 0], [11, 1], [21, 2]]
    const testCountYieldsExpected = ([count, expected]) => {
      it(`should have ${expected} pages left when count of ${count}`, () => {
        const getMock = jest.fn(() => Promise.resolve(getResponseObject(count)))

        jest.spyOn(axios, 'get').mockImplementation(getMock)

        return api.getTracks(1).then((tracks) => {
          expect(tracks.pagesLeft).toEqual(expected)
        })
      })
    }

    countsAndExpecteds.forEach(testCountYieldsExpected)
  })

  it('should return axios.get', () => {
    // $FlowFixMe
    expect(api.getTracks()).toEqual(axios.get())
  })
})
