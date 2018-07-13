const express = require('express')
const next = require('next')
const mobxReact = require('mobx-react')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

mobxReact.useStaticRendering(true)

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

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://${host}:${port}`)
    })
  })
  .catch(ex => {
    console.log(ex.stack)
    process.exit(1)
  })
