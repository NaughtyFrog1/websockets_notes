/**
 * Archivo que guarda las conexiones de websockets
 */

import { appendNote, renderNotes } from './ui.js'

const socket = io()

export function saveNote(title, desc) {
  // Pasamos como parametro el nombre del evento e información
  socket.emit('client:newNote', { title, desc })
}

export function deleteNote(id) {
  socket.emit('client:deleteNote', id)
}

socket.on('server:getNewNote', appendNote)
socket.on('server:getNotes', renderNotes)
