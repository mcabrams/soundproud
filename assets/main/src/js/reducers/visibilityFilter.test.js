import reducer from './visibilityFilter'
import * as filters from '../constants/VisibilityFilterConstants'

describe('visibility filter reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, { type: '@@INIT', filter: 'bar' }),
    ).toEqual(filters.SHOW_UNARCHIVED)
  })

  it('should handle SET_VISIBILITY_FILTER', () => {
    expect(
      reducer(
        filters.SHOW_UNARCHIVED,
        {
          type: 'SET_VISIBILITY_FILTER',
          filter: filters.SHOW_ALL,
        },
      )).toEqual(filters.SHOW_ALL)
  })
})
