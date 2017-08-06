import axios from 'axios'
import { throwIfMissing } from './helpers'

const PAGE_SIZE = 10

export function archiveTrack(track = throwIfMissing()) {
  return axios.patch(`/tracks/${track.id}/`, {
    archived: true,
  })
}

function responseToTracks(response) {
  const tracks = response.data.results

  return tracks
    .map((track) => {
      const dateParsedTrack = track
      dateParsedTrack.created_at = Date.parse(track.created_at)
      dateParsedTrack.updated_at = Date.parse(track.updated_at)
      return dateParsedTrack
    })
}

export function getTracks(page = 1) {
  return axios.get(`/tracks/?page=${page}&archived=false`)
    .then(response => ({
      tracks: responseToTracks(response),
      pagesLeft: Math.ceil(response.data.count / PAGE_SIZE) - page,
    }))
}
