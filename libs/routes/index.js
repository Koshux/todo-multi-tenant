'use strict'

const authenticationRoute = require('./authentication')
const createRoute = require('./create-note')
const deleteRoute = require('./delete-note')
const readRoute = require('./read-note')
const sessionRoutes = require('./session')

function setupRoutes (app, router) {
  // Setup Authentication route.
  authenticationRoute(app, router)

  // Setup the session related routes.
  sessionRoutes(router)

  // Setup CRUD routes.
  createRoute(router)
  deleteRoute(router)
  readRoute(router)
}

module.exports = setupRoutes
