import { removeLoginEvents } from './loginEvents.js'
import { renderNotes, showNotesSection } from './ui.js'

const socket = io()

export function createRoom(username) {
  socket.emit('room:create', username, (roomUUID, room) => {
    removeLoginEvents()
    showNotesSection(roomUUID)
  })
}
