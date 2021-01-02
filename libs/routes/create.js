'use strict'

const Note = require('../models/note')
const { isAuth } = require('../auth/middleware')

function createRoute (router) {
  router.post('/todo', isAuth, (req, res, next) => {
    const { author, date, title} = req.body.data
    const data = { author, date, title }
    Note.save(data, (err, note) => {
      if (err) {
        next(err)
      }

      console.log('Created a note', note)
      res.json({
        title: 'Notes',
        note: note
      })
    })
  })
}

module.exports = createRoute
