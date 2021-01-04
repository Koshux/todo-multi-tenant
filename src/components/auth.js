class Auth {
  constructor () {
    this.authenticated = false
  }

  login (cb) {
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ username: 'roger2', password: '123' })
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

  register (cb) {
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ username: 'roger', password: '123' })
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
      })
  }

  isAuthenticated () {
    return this.authenticated
  }
}

export default new Auth()
