'use strict'

const passport = require('passport')

function AuthenticationRoute (app) {
  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req, res, next) => {
    console.log('Session created:', req.session)
    console.log('User is:', req.user)

    next()
  })
}

module.exports = AuthenticationRoute
