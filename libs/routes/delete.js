'use strict'

const Note = require('../models/note')

function deleteRoute (router) {
  router.delete('/todo/:title', (req, res, next) => {
    Note.delete({ title: req.params.title }, (err, note) => {
      if (err) {
        next(err)
      }

      console.log('Deleted a note:', note)
      res.json({
        title: 'Notes',
        note: note
      })
    })
  })
}

module.exports = deleteRoute
