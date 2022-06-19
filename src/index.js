import express from 'express'
import http from 'http'
import WebSocket from 'socket.io'

const app = express()
const httpServer = http.createServer(app)
const io = new WebSocket.Server(httpServer)

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('Nueva conexión: ', socket.id)
  socket.emit(`ping`)

  socket.on('timeout', () => {
    console.log('Timeout on: ', socket.id)
  })
})

httpServer.listen(3000, () => {
  console.log(
    '\n\x1b[1m>>> \x1b[32mServer listening on \x1b[4mhttp://localhost:3000\x1b[0m\n\n'
  )
})
