'use strict'

const app = require('./express/server')

app.listen(3000, () => {
  console.log('Started Netlify-ExpressJS app on Port 3000!')
})
