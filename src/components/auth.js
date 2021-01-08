class Auth {
  constructor () {
    this.authenticated = false
  }

  /**
   * Used to authenticate using POST /login for the user to access the webapp.
   *
   * @param {function} setErrorHandler State to display error on Login Page.
   * @param {Object}       credentials Credentials with username & password.
   * @param {function}              cb Callback fired when request is complete.
   */
  login (setErrorHandler, credentials, cb) {
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
      .then(() => {
        this.authenticated = true
        cb()
      })
      .catch(err => {
        console.error(err)
        setErrorHandler(err)
      })
  }

  /**
   * Used to terminate an authenticated session using GET /logout for the user
   * to be denied access to the webapp.
   *
   * @param {function} cb Callback fired when request is complete.
   */
  logout (cb) {
    fetch('/.netlify/functions/server/logout')
      .then(resp => resp.json())
      .then(() => {
        this.authenticated = false
        cb()
      })
      .catch(err => {
        console.error(err)
      })
  }

  /**
   * Used to register a new user using POST /register for the user to log into
   * the webapp.
   *
   * @param {function} setErrorHandler State to display error on Register Page.
   * @param {Object}       credentials Credentials with username & password.
   * @param {function}              cb Callback fired when request is complete.
   */
  register (setErrorHandler, credentials, cb) {
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
      .then(() => {
        this.authenticated = true
        cb()
      })
      .catch(err => {
        console.error(err)
        setErrorHandler(err)
      })
  }

  // Return the current state of the user authentication.
  isAuthenticated () {
    return this.authenticated
  }
}

export default new Auth()
