'use strict'

// load .env file.
require('dotenv').config()

const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  admin: Boolean
})

const user = connection.model('User', UserSchema)
module.exports = connection
