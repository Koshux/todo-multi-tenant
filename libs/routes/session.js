'use strict'

const passport = require('passport')
const User = require('../models/user')

function usersRoute (router) {
  loginRoute(router)
  logoutRoute(router)
  registerRoute(router)
}

function loginRoute (router) {
  router.post('/loginUser', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/todo-list'
  }))
}

function logoutRoute (router) {
  router.get('/logoutUser', (req, res) => {
    req.logout()
    res.redirect('/login')
  })
}

function registerRoute (router) {
  router.post('/registerUser', (req, res, next) => {
    const { hash, salt } = genPassword(req.body.password)
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

    res.redirect('/login')
  })
}

module.exports = usersRoute
