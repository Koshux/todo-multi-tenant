'use strict'

// load .env file.
require('dotenv').config()

const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  body: {
    type: String,
    required: true
  }
})

const note = connection.model('Note', NoteSchema)
module.exports = connection
