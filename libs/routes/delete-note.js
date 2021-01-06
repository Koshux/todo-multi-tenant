'use strict'

const { Note } = require('../models/note').models
const { isAuth } = require('../auth/middleware')

function DeleteRoute (router) {
  router.delete('/todo', isAuth, (req, res, next) => {
    Note.delete(
      { id: req.query.objectId, user: req.query.title },
      (err, note) => {
        if (err) {
          next(err)
        }

        console.log('Deleted a note:', note)
        res.json({
          title: 'Notes',
          note: note
        })
      }
    )
  })
}

module.exports = DeleteRoute
