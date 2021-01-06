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

      console.log('Found individual note:', note)
      res.json({
        date: note.date,
        note: note.body,
        title: note.title,
        username: req.user.username
      })
    })
  })
}

function findAllRoute (router) {
  router.get('/todo', isAuth, (req, res, next) => {
    console.log('logged in user:', req.user)
    Note.find({ user: req.user.username }, (err, notes) => {
      if (err) {
        next(err)
      }

      console.log('Found all notes:', notes)
      res.json({
        date: note.date,
        note: note.body,
        title: note.title,
        username: req.user.username
      })
    })
  })
}

module.exports = ReadRoute
