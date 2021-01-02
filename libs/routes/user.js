'use strict'

const passport = require('passport')

function userRoute (app) {
  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req, res, next) => {
    console.log('Session:', req.session)
    console.log('User:', req.user)

    next()
  })
}

module.exports = userRoute
