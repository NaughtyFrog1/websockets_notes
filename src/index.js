import express from 'express'
import http from 'http'
import WebSocket from 'socket.io'
import { v4 as uuid } from 'uuid'

const app = express()
const httpServer = http.createServer(app)
const io = new WebSocket.Server(httpServer)

let notes = []

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('Nueva conexión: ', socket.id)

  socket.emit('server:getNotes', notes)

  // Recibimos como parámetro del callback la información envíada por el cliente
  socket.on('client:saveNote', (data) => {
    const note = { id: uuid(), ...data }
    notes.push(note)
    io.emit('server:getNewNote', note)
  })

  socket.on('client:deleteNote', (id) => {
    notes = notes.filter((note) => note.id !== id)
    io.emit('server:getNotes', notes)
  })

  socket.on('client:getNote', (id) => {
    socket.emit(
      'server:selectedNote',
      notes.find((note) => note.id === id)
    )
  })

  socket.on('client:updateNote', (updateNote) => {
    notes = notes.map((note) => {
      if (note.id === updateNote.id) {
        note.title = updateNote.title
        note.desc = updateNote.desc
      }
      return note
    })
    io.emit('server:getNotes', notes)
  })
})

httpServer.listen(3000, () => {
  console.log(
    '\n\x1b[1m>>> \x1b[32mServer listening on \x1b[4mhttp://localhost:3000\x1b[0m\n\n'
  )
})
