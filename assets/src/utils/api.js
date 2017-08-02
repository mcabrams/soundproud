import axios from 'axios'

const PAGE_SIZE = 10

export function archiveTrack(track) {
  return axios.patch('/tracks/' + track.id + '/', {
    'archived': true
  })
}

function responseToTracks(response) {
  let tracks = response.data.results

  return tracks
    .map(track => {
      track['created_at'] = Date.parse(track['created_at'])
      track['updated_at'] = Date.parse(track['updated_at'])
      return track
    })
}

export function getTracks(page) {
  page = page || 1;

  return axios.get('/tracks/?page=' + page + '&archived=false')
    .then(response => {
      return {
        tracks: responseToTracks(response),
        pagesLeft: Math.ceil(response.data.count/PAGE_SIZE) - page
      }
    })
}
