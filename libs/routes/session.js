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
    const form = '<h1>Login Page</h1><form method="POST" action="/.netlify/functions/server/login">\
                Enter Username:<br><input type="text" name="username">\
                <br>Enter Password:<br><input type="password" name="password">\
                <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
  })
}

function registerPage (router) {
  router.get('/register', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="/.netlify/functions/server/register">\
                Enter Username:<br><input type="text" name="username">\
                <br>Enter Password:<br><input type="password" name="password">\
                <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
  })
}

function loginRoute (router) {
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/.netlify/functions/server/register',
    successRedirect: '/.netlify/functions/server/todo'
  }))
  // router.post('/login', (req, res, next) => {
  //   console.log('req.body:', req.body)
  //   passport.authenticate('local', (err, user, info) => {
  //     console.log('error:', err)
  //     console.log('user:', req.user)
  //     console.log('info:', info)
  //     if (err) return next(err)
  //     if (!user) return res.redirect('/.netlify/functions/server/register')
  //     req.logIn(user, err => {
  //       if (err) return next(err)
  //       return res.redirect('/.netlify/functions/server/todo')
  //     })
  //   })(req, res, next)
  // })
}

function logoutRoute (router) {
  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/.netlify/functions/server')
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

    res.redirect('/.netlify/functions/server/login')
  })
}

module.exports = usersRoute
