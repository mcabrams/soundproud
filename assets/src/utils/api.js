import axios from 'axios'

export function getTracks() {
  return axios.get('/tracks/').then(tracks => tracks.data)
}
