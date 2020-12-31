'use strict'

const app = require('./functions/todo-api/server')
const port = 4000
app.listen(port, () => {
  console.log(`Started Netlify-ExpressJS app on Port ${port}!`)
})
