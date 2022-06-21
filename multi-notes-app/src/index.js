import express from 'express'
import http from 'http'
import socketIO from 'socket.io'

const app = express()
const httpServer = http.createServer(app)
const io = new socketIO.Server(httpServer)

app.use(express.static('public'))

io.on('connection', (socket) => {})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(
    `\n\x1b[1m>>> \x1b[32mServer listening on \x1b[4mhttp://localhost:${PORT}\x1b[0m\n\n`
  )
})
