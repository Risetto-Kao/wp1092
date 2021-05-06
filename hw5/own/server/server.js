import express from 'express'
import cors from 'cors'
import path from 'path'

import guessRoute from './routes/guess'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

// log file
const fs = require('fs')
const date = require('date-and-time')
let now = new Date()
now = date.format(now,'YYYY-MM-DD-HH-mm-ss')
const serverUpTime = now.toString()


app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)

  // record timestamp

  console.log(`${serverUpTime}`)
  fs.writeFile(
    `server/log/${serverUpTime}.log`,
    `[${serverUpTime}] Server on\n`,
    (error)=>{
      console.log(`When writing to log, error happened: ${error}`)
  })
})

export {serverUpTime}

