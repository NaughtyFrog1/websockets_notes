import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import {
  createNote,
  createRoom,
  deleteNote,
  joinRoom,
  updateNote,
} from './handlers/handlerRooms'

const app = express()
const httpServer = http.createServer(app)
const io = new socketIO.Server(httpServer)

app.use(express.static('public'))

io.on('connection', (socket) => {
  let socketUsername = ''
  let roomUUID = ''

  socket.on('room:create', (username, callback) => {
    // TODO: Validar username (hacerlo en createRoom)
    const { uuid, room } = createRoom(username)
    socketUsername = username
    roomUUID = uuid
    socket.join(roomUUID)
    callback(roomUUID, room)
  })

  socket.on('room:join', (uuid, username) => {
    // TODO: Validar uuid y username
    socketUsername = username
    roomUUID = uuid
    socket.join(roomUUID)
    const room = joinRoom(roomUUID, username)
    callback(roomUUID, room)
  })

  socket.on('note:create', (title, content) => {
    // TODO: Validar title y content
    const updatedNotes = createNote(roomUUID, title, content, socketUsername)
    io.to(roomUUID).emit('server:updateNotes', updatedNotes)
  })

  socket.on('note:update', (noteUUID, title, content) => {
    // TODO: Validar noteId, title, content
    const updatedNotes = updateNote(
      roomUUID,
      noteUUID,
      title,
      content,
      socketUsername
    )
    io.to(roomUUID).emit('server:updateNotes', updatedNotes)
  })

  socket.on('note:delete', (noteUUID) => {
    // TODO: Validar noteUUID
    const updatedNotes = deleteNote(roomUUID, noteUUID)
    io.to(roomUUID).emit('server:updateNotes', updatedNotes)
  })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(
    `\n\x1b[1m>>> \x1b[32mServer listening on \x1b[4mhttp://localhost:${PORT}\x1b[0m\n\n`
  )
})
