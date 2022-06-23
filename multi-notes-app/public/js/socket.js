import { removeLoginEvents } from './loginEvents.js'
import { renderNotes, showNotesSection } from './ui.js'

const socket = io()

export function roomCreate(username) {
  socket.emit('room:create', username, (roomUUID, room) => {
    removeLoginEvents()
    showNotesSection(roomUUID)
    renderNotes(room.notes)
  })
}

export function roomJoin(uuid, username) {
  socket.emit('room:join', uuid, username, (roomUUID, room) => {
    removeLoginEvents()
    showNotesSection(roomUUID)
    renderNotes(room.notes)
  })
}
