'use strict'

const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
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

let Note = module.exports = mongoose.model('Note', noteSchema)
