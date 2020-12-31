'use strict'

const express = require('express')
const serverless = require('serverless-http')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = express.Router()

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', () => console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Established connection with MongoDB cloud!')
})

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h1>Hello from Express.js!</h1>')
  res.end()
})

router.get('/todo', (req, res) => {
  res.json(getData())
})

app.use(bodyParser.json())
app.use('/.netlify/functions/server', router) // path must route to lambda.

function getData () {
  console.log('getData was called from GET /todo.')
  return {
    'hello': 'Gotcha!'
  }
}

module.exports = app
module.exports.handler = serverless(app)
