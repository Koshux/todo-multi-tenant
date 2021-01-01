'use strict'

const Note = require('../models/note')

function findNotes (router) {
  setupRoutes(router)
}

function setupRoutes (router) {
  findOne(router)
  findAll(router)
}

function findOne (router) {
  router.get('/todo/:title', (req, res, next) => {
    Note.find({ title: req.params.title }, (err, note) => {
      if (err) {
        next(err)
      }

      console.log('Found individual note:', note)
      res.json({
        title: 'Notes',
        note: note
      })
    })
  })
}

function findAll (router) {
  router.get('/todo', (req, res, next) => {
    Note.find({}, (err, notes) => {
      if (err) {
        next(err)
      }

      console.log('Found all notes:', notes)
      res.json({
        title: 'Notes',
        notes: notes
      })
    })
  })
}

module.exports = findNotes
