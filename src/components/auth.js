class Auth {
  constructor () {
    this.authenticated = false
  }

  login (setError, credentials, cb) {
    const { username, password } = credentials
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ username, password })
    }

    fetch('/.netlify/functions/server/login', options)
      .then(resp => resp.json())
      .then(data => {
        console.log('login data', data)
        this.authenticated = true
        cb()
      })
      .catch(err => {
        console.error(err)
        setError(err)
      })
  }

  logout (cb) {
    fetch('/.netlify/functions/server/logout')
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

  register (setError, credentials, cb) {
    const { username, password } = credentials
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ username, password })
    }

    fetch('/.netlify/functions/server/register', options)
      .then(resp => resp.json())
      .then(data => {
        console.log('register data', data)
        this.authenticated = true
        cb()
      })
      .catch(err => {
        console.error(err)
        setError(err)
      })
  }

  isAuthenticated () {
    return this.authenticated
  }
}

export default new Auth()
