'use strict'

const createNote = require('./create')
const deleteNote = require('./delete')
const readNote = require('./read')
const updateNote = require('./update')

function setupRoutes (router) {
  createNote(router)
  deleteNote(router)
  readNote(router)
  updateNote(router)
}

module.exports = setupRoutes
