'use strict'

const { Note } = require('../models/note').models
const { isAuth } = require('../auth/middleware')

function DeleteRoute (router) {
  router.delete('/todo/:id', isAuth, (req, res) => {
    // find by id
    // delete
    console.log('Note delete body:', req.params.id, req.user)
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        res.status(404).json({
          message: `Task ID: ${req.body.i} was not found.`
        })
      }

      note.remove().then((note) => {
        console.log('Deleted a note:', note)
        res.json({
          message: `Deleted note by ID: ${req.params.id}`
        })
      }).catch(err => {
        res.status(500).json({
          message: err
        })
      })
    })
  })
}

module.exports = DeleteRoute
