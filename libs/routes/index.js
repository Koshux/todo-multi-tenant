'use strict'

const createRoute = require('./create')
const defaultRoute = require('./default')
const deleteRoute = require('./delete')
const readRoute = require('./read')
const updateRoute = require('./update')
const userRoute = require('./user')
const sessionRoutes = require('./session')

function setupRoutes (app, router) {
  // Always load the default route first to ensure the '<domain>/' is setup.
  defaultRoute(router)

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
