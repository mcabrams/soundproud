import axios from 'axios'

export function archiveTrack(track) {
  return axios.patch('/tracks/' + track.id + '/', {
    'archived': true
  })
}

export function getTracks() {
  return axios.get('/tracks/').then(tracks => tracks.data.filter(track => !track.archived))
}
