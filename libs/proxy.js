const proxy = require('http-proxy-middleware')

module.exports = app => {
  const basePath = '/.netlify/functions/server'

  app.use(basePath, proxy({ target: 'http://localhost:9000' }))
}
