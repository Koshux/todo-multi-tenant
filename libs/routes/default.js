'use strict'

function defaultRoute (router) {
  router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h1>Default landing page!</h1>')
    res.end()
  })
}

module.exports = defaultRoute
