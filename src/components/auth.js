class Auth {
  constructor () {
    this.authenticated = false
  }

  login (cb) {
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ username: 'roger', password: '123' }) // body data type must match "Content-Type" header
    }

    fetch('/server/login', options)
      .then(resp => resp.json())
      .then(data => {
        console.log('login data', data)
        this.authenticated = true
        cb()
      })
      .catch(err => {
        console.error(err)
      })
  }

  logout (cb) {
    fetch('/server/logout')
      .then(resp => resp.json())
      .then(data => {
        console.log('logout data', data)
        this.authenticated = false
        cb()
      })
      .catch(err => {
        console.error(err)
      })
  }

  isAuthenticated () {
    return this.authenticated
  }
}

export default new Auth()
