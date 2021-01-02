'use strict'

// load .env file.
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const serverless = require('serverless-http')
const setupRoutes = require('../../libs/routes/index')

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
}

mongoose.connect(process.env.MONGODB_URL, mongoOptions)

const app = express()
const db = mongoose.connection
const router = express.Router()

db.on('open', () => {
  console.log('Established connection with MongoDB.')

  setupRoutes(app, router)
  app.use(bodyParser.json())

  // Path must route to lambda-functions (compiled netlify functions folder).
  app.use('/.netlify/functions/server', router)
})

db.on('error', () => console.error.bind(console, 'connection error:'))

module.exports = app
module.exports.handler = serverless(app)
