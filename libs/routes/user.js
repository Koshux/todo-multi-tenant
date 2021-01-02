'use strict'

const passport = require('passport')

function userRoute (app, router) {
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/users', router)
  app.use(auth)
}

function auth (req, res, next) {
  console.log('User found:', req.session)
  console.log('User found:', req.user)

  if (!req.user) {
    const err = new Error('You are not authenticated.')
    err.status = 403
    next(err)
  } else {
    next()
  }
}

module.exports = userRoute
