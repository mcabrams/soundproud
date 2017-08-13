import axios from 'axios'

const PAGE_SIZE = 10

function responseToTracks(response) {
  const tracks = response.data.results

  return tracks
    .map((track) => {
      const dateParsedTrack = track
      dateParsedTrack.created_at = new Date(Date.parse(track.created_at))
      dateParsedTrack.updated_at = new Date(Date.parse(track.updated_at))
      return dateParsedTrack
    })
}

function pagesLeft(currentPage, totalEntries) {
  const totalPages = Math.ceil(totalEntries / PAGE_SIZE)
  return totalPages === 0 ? 0 : totalPages - currentPage
}

export function archiveTrack(track: { id: number }) {
  return axios.patch(`/tracks/${track.id}/`, {
    archived: true,
  })
}

export function fetchTracksData(page: number = 1) {
  return axios.get(`/tracks/?page=${page}&archived=false`)
    .then(response => ({
      tracks: responseToTracks(response),
      pagesLeft: pagesLeft(page, response.data.count),
    }))
}
