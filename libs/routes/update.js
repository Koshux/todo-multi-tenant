'use strict'

const Note = require('../models/note')
const { isAuth } = require('../auth/middleware')

function updateRoute (router) {
  router.put('/todo/:title', isAuth, (req, res, next) => {
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

module.exports = updateRoute
