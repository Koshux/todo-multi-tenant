class Auth {
  constructor () {
    this.authenticated = false
  }

  login (cb) {
    fetch('/api/login')
      .then(resp => resp.json)
      .then(data => {

        this.authenticated = true
        cb()
      })
      .catch(err => {
        console.error(err)
      })
  }

  logout (cb) {
    this.authenticated = false
    cb()
  }

  isAuthenticated () {
    return this.authenticated
  }
}

export default new Auth()
