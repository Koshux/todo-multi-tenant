'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  admin: {
    type: Boolean,
    default: false
  }
})

User.plugin(require('passport-local-mongoose'))

module.exports = mongoose.model('User', userSchema)
