'use strict'

const passport = require('passport')
const { User } = require('../models/user').models
const { generatePassword } = require('../auth/password-utils')

function usersRoute (router) {
  // temporary:
  loginPage(router)
  registerPage(router)

  loginRoute(router)
  logoutRoute(router)
  registerRoute(router)
}

function loginPage (router) {
  router.get('/login', (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="login">\
                Enter Username:<br><input type="text" name="username">\
                <br>Enter Password:<br><input type="password" name="password">\
                <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
  })
}

function registerPage (router) {
  router.get('/register', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                Enter Username:<br><input type="text" name="username">\
                <br>Enter Password:<br><input type="password" name="password">\
                <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
  })
}

function loginRoute (router) {
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login.html',
    successRedirect: '/todo-list.html'
  }))
}

function logoutRoute (router) {
  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login.html')
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

    res.redirect('/login')
  })
}

module.exports = usersRoute
