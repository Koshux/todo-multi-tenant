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
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
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
    const { hash, salt } = generatePassword(req.body.password)
    const newUser = new User({
      admin: true,
      hash,
      salt,
      username: req.body.username
    })

    newUser.save().then(user => {
      console.log('Created a new user:', user)
    }).catch(err => {
      console.error(err)
    })

    res.redirect('/')
  })
}

module.exports = usersRoute
