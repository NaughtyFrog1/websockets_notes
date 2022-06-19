import express from 'express'
import http from 'http'
import WebSocket from 'socket.io'
import { v4 as uuid } from 'uuid'

const app = express()
const httpServer = http.createServer(app)
const io = new WebSocket.Server(httpServer)

const notes = []

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('Nueva conexión: ', socket.id)

  // Recibimos como parámetro del callback la información envíada por el cliente
  socket.on('client:newNote', (data) => {
    const note = { id: uuid(), ...data }
    notes.push(note)
    socket.emit('server:getNewNote', note)
  })
})

httpServer.listen(3000, () => {
  console.log(
    '\n\x1b[1m>>> \x1b[32mServer listening on \x1b[4mhttp://localhost:3000\x1b[0m\n\n'
  )
})
