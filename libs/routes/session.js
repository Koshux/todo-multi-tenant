'use strict'

const passport = require('passport')
const { User } = require('../models/user').models
const { generatePassword } = require('../auth/password-utils')

function usersRoute (router) {
  loginRoute(router)
  logoutRoute(router)
  registerRoute(router)
}

function loginRoute (router) {
  router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Login, hello:', req.user)
    res.json({ message: 'Successfully authenticated!' })
  })
}

function logoutRoute (router) {
  router.get('/logout', (req, res) => {
    req.logout()
    console.log('Logout, bye:', req.user)
    res.json({ message: "Successfully logged out!" })
  })
}

function registerRoute (router) {
  router.post('/register', (req, res, next) => {
    const { password, username } = req.body
    if (username == null || username == '' ||
      password == null || password === '') {
        res.status(400).json({
          message: 'You must provide both username and password to register.'
        })
    }

    const { hash, salt } = generatePassword(password)
    const newUser = new User({
      admin: true,
      hash,
      salt,
      username: username
    })

    User.count({ username: username }, (err, count) => {
      if (count > 0) res.status(401).json({ message: 'Failed registration. '})

      newUser.save().then(user => {
        console.log('Created a new user:', user)
        res.json({ message: "Successfully registered!" })
      }).catch(err => {
        console.error(err)
        res.status(401).json({
          message: 'Something went wrong during registration.'
        })
      })
    })
  })
}

module.exports = usersRoute
