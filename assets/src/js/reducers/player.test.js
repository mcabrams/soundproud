import reducer from './player'

const initialState = {
  isPlaying: false,
}

describe('player reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle TOGGLE_PLAYING if not playing', () => {
    expect(reducer(
      { isPlaying: false },
      { type: 'TOGGLE_PLAYING' },
    )).toEqual(
      { isPlaying: true },
    )
  })

  it('should handle TOGGLE_PLAYING if is playing', () => {
    expect(reducer(
      { isPlaying: true },
      { type: 'TOGGLE_PLAYING' },
    )).toEqual(
      { isPlaying: false },
    )
  })
})

