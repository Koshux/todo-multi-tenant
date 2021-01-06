'use strict'

const { Note } = require('../models/note').models
const { isAuth } = require('../auth/middleware')

function CreateRoute (router) {
  router.post('/todo', isAuth, (req, res, next) => {
    const { body, date, title, username } = req.body.data
    const data = { body, date, title, username }
    Note.save(data, (err, note) => {
      if (err) {
        next(err)
      }

      console.log('Created a note', note)
      res.json({
        date: note.date,
        note: note.body,
        title: note.title,
        username: req.user.username
      })
    })
  })
}

module.exports = CreateRoute
