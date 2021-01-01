'use strict'

const Note = require('../models/note')

function updateNote (router) {
  setupRoute(router)
}

function setupRoute (router) {
  router.put('/todo/:title', (req, res, next) => {
    const { body, date } = req.body
    const data = { body, date, title: req.params.title }
    Note.update(data, (err, note) => {
      if (err) {
        next(err)
      }

      console.log('Updated a note:', note)
      res.json({
        title: req.params.title,
        note: note
      })
    })
  })
}

module.exports = updateNote
