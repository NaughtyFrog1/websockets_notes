/**
 * Archivo que guarda las conexiones de websockets
 */

import { appendNote, renderNotes, updateForm } from './ui.js'

const socket = io()

export function saveNote(title, desc) {
  // Pasamos como parametro el nombre del evento e información
  socket.emit('client:saveNote', { title, desc })
}

export function deleteNote(id) {
  socket.emit('client:deleteNote', id)
}

export function getNote(id) {
  socket.emit('client:getNote', id)
}

export function updateNote(id, title, desc) {
  socket.emit('client:updateNote', { id, title, desc })
}

socket.on('server:getNewNote', appendNote)
socket.on('server:getNotes', renderNotes)
socket.on('server:selectedNote', updateForm)
