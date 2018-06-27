const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000;

/* eslint no-console: 0 */
app.prepare()
  .then(() => {
    const server = express()

    server.get('/home', (req, res) => {
      const actualPage = '/home'
      app.render(req, res, actualPage)
    })

    server.get('/', (req, res) => {
      const actualPage = '/home'
      app.render(req, res, actualPage)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.log(ex.stack)
    process.exit(1)
  })
