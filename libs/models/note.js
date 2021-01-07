'use strict'

// load .env file.
require('dotenv').config()

const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const NoteSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    ref: "User"
  }
})

const note = connection.model('Note', NoteSchema)
module.exports = connection
