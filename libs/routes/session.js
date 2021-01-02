'use strict'

const passport = require('passport')
const User = require('../models/user')

function usersRoute (router) {
  loginRoute(router)
  logoutRoute(router)
  registerRoute(router)
}

function loginRoute (router) {
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({
      success: true,
      status: 'Registration successful!'
    })
  })
}

function logoutRoute (router) {
  router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy()
      res.clearCookie('session-id')
      res.redirect('/')
    } else {
      const err = new Error('You are not logged in!')
      err.status(403)
      next(err)
    }

  })
}

function registerRoute (router) {
  router.post('/register', (req, res, next) => {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          next(err)
        }

        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json({
            success: true,
            status: 'Registration successful!'
          })
        })
      }
    )
  })
}

module.exports = usersRoute
