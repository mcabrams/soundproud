import axios from 'axios'

const PAGE_SIZE = 10

export function archiveTrack(track) {
  return axios.patch('/tracks/' + track.id + '/', {
    'archived': true
  })
}

function sortTracks(tracks) {
  return tracks
    .filter(track => !track.archived)
    .map(track => {
      track['created_at'] = Date.parse(track['created_at'])
      track['updated_at'] = Date.parse(track['updated_at'])
      return track
    })
    .sort((a, b) => b.created_at - a.created_at)
}

export function getTracks(page) {
  page = page || 1;

  return axios.get('/tracks/?page=' + page)
    .then(response => {
      return {
        tracks: sortTracks(response.data.results),
        pagesLeft: Math.ceil(response.data.count/PAGE_SIZE) - page
      }
    })
}
