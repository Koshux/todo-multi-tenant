'use strict'

const createRoute = require('./create')
const deleteRoute = require('./delete')
const readRoute = require('./read')
const updateRoute = require('./update')
const userRoute = require('./user')
const sessionRoutes = require('./session')

function setupRoutes (app, router) {
  // Setup Authentication route.
  userRoute(app, router)

  // Setup the session related routes.
  sessionRoutes(router)

  // Setup CRUD routes.
  createRoute(router)
  deleteRoute(router)
  readRoute(router)
  updateRoute(router)
}

module.exports = setupRoutes
