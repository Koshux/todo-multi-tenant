'use strict'

const express = require('express')
const path = require('path')
const serverless = require('serverless-http')
const app = express()
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.json())
router.get('/todo', (req, res) => {
  res.json(getData())
})

app.use(bodyParser.json())
app.use('/.netlify/functions/lambda', router) // path must route to lambda.

function getData () {
  console.log('getData was called from GET /todo.')
  return 'Gotcha!'
}

module.exports = app
module.exports.handler = serverless(app)
