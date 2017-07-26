import axios from 'axios'

export function archiveTrack(track) {
  return axios.patch('/tracks/' + track.id + '/', {
    'archived': true
  })
}

export function getTracks() {
  return axios.get('/tracks/')
    .then(tracks => tracks.data.filter(track => !track.archived))
    .then(tracks => tracks.map(track => {
      track['created_at'] = Date.parse(track['created_at'])
      track['updated_at'] = Date.parse(track['updated_at'])
      return track
    }))
    .then(tracks => tracks.sort((a, b) => b.created_at - a.created_at))
}
