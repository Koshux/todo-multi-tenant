const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  const basePath = '/server'

  app.use(basePath, createProxyMiddleware({
    target: 'http://localhost:9000/.netlify/functions'
  }))
}
