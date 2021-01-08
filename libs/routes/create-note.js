'use strict'

const { Note } = require('../models/note').models
const { isAuth } = require('../auth/middleware')

function CreateRoute (router) {
  router.post('/todo', isAuth, (req, res, next) => {
    const note = new Note({
      body: req.body.body,
      date: new Date(),
      title: req.body.title,
      author: req.user.username
    })

    note.save().then(note => {
      console.log('Created a note', note)
      res.json({
        author: note.author,
        body: note.body,
        date: note.date,
        id: note._id,
        title: note.title
      })
    }).catch(err => {
      console.error(err)
      res.status(401).json({ message: err })
    })
  })
}

module.exports = CreateRoute
