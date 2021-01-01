'use strict'

require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const setupRoutes = require('../../libs/routes/index')

const router = express.Router()
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', () => console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Established connection with MongoDB cloud!')

  setupDefaultRoute(router)
  setupRoutes(router)

  app.use(bodyParser.json())
  app.use('/.netlify/functions/server', router) // path must route to lambda.
})

function setupDefaultRoute (router) {
  router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h1>Default landing page!</h1>')
    res.end()
  })
}

module.exports = app
module.exports.handler = serverless(app)
