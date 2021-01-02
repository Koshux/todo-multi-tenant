'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/user').models
const { validPassword } = require('../auth/password-utils')

const customFields = {
  usernameField: 'username',
  passwordField: 'password'
}

const verifyCb = (username, password, done) => {
  User.findOne({ username: username }).then(user => {
    if (!user) return done(null, false)

    const isValid = validPassword(password, user.hash, user.salt)

    if (isValid) return done(null, user)
    return done(null, false)
  }).catch(done)
}

const strategy = new LocalStrategy(customFields, verifyCb)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  User.findById(userId).then(user => {
    done(null, user)
  }).catch(done)
})
