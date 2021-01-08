'use strict'

const { Note } = require('../models/note').models
const { isAuth } = require('../auth/middleware')

function ReadRoute (router) {
  findOneRoute(router)
  findAllRoute(router)
}

function findOneRoute (router) {
  router.get('/todo/:id', isAuth, (req, res, next) => {
    if (req.params.id == null) {
      res.status(400).json({
        message: 'The unique ID of the note was not passed in the query ' +
          'parameters of the request.'
      })
    }

    Note.find(
      { id: req.params.id, user: req.user.username },
      (err, note) => {
      if (err) {
        next(err)
      }

      res.json({
        id: note._id,
        date: note.date,
        note: note.body,
        title: note.title,
        author: req.user.username
      })
    })
  })
}

function findAllRoute (router) {
  router.get('/todo', isAuth, (req, res, next) => {
    Note.find({ author: req.user.username }, (err, notes) => {
      if (err) {
        next(err)
      }

      res.json(notes.map(note => {
        return {
          author: req.user.username,
          body: note.body,
          date: note.date,
          id: note._id,
          title: note.title
        }
      }))
    })
  })
}

module.exports = ReadRoute
