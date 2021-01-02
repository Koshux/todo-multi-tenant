'use strict'

const createRoute = require('./create')
const defaultRoute = require('./default')
const deleteRoute = require('./delete')
const readRoute = require('./read')
const updateRoute = require('./update')

function setupRoutes (router) {
  defaultRoute(router)
  createRoute(router)
  deleteRoute(router)
  readRoute(router)
  updateRoute(router)
}

module.exports = setupRoutes
