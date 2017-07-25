let settings = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

function get(path) {
  return fetch(path, settings)
    .then(
      function(res) {
        if (res.status !== 200) {
          console.log('Non-200; Status Code: ' + res.status)
          return
        }

        return res.json()
      })
    .catch(function(err) {
      console.log('Fetch Error :-S', err)
    });
}

export function getTracks() {
  return get('/tracks/')
}
