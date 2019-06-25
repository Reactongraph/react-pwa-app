import fetch from 'cross-fetch'


// Make an api call
export default async (url, method = 'post', body) => fetch(`${constant.URL}${url}`, {
  method,
  body: JSON.stringify(body),
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authentication_token')}`,
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json)
    }
    return json
  })
  .then(
    response => response,
    error => error,
  )
