'use strict'

const Note = require('../models/note')

function readRoute (router) {
  findOneRoute(router)
  findAllRoute(router)
}

function findOneRoute (router) {
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

function findAllRoute (router) {
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

module.exports = readRoute
