'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const serverless = require('serverless-http')
const session = require('express-session')
const setupRoutes = require('../../libs/routes/index')
const userConnection = require('../../libs/models/user')

const MongoStore = require('connect-mongo')(session)
const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = new MongoStore({
  mongooseConnection: userConnection,
  collection: 'sessions'
})

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

// Require the entire Passport module for node to initialise the code.
require('../../libs/auth/passport')

// Setup the ExpressJS routes.
setupRoutes(app, router)

// Path must route to lambda-functions (compiled netlify functions folder).
app.use('/.netlify/functions/server', router)

module.exports = app
module.exports.handler = serverless(app)
