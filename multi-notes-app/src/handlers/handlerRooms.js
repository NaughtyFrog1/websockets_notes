// @ts-check
import * as UUID from 'uuid'

/**
 * @typedef Note
 * @type {object}
 * @property {string} title     Note title
 * @property {string} content   Note content
 * @property {string} author    Name of the creator
 * @property {string} editor    Name of the last editor. If the note hasn't been edited is empty
 * @property {number} lastEdit  Date of the last modification in unix timestamp
 *
 * @typedef Room
 * @type {object}
 * @property {string[]} users   Name of the users connected to the room
 * @property {object}   notes   Notes in the room {'id': {Note}}
 */

const rooms = {}

export function createRoom(username) {
  let uuid = UUID.v4()
  while (rooms.hasOwnProperty(uuid)) uuid = UUID.v4()
  rooms[uuid] = { users: [username], notes: {} }
  return { uuid, room: rooms[uuid] }
}

export function joinRoom(uuid, username) {
  rooms[uuid].users.push(username)
  return rooms[uuid]
}

export function createNote(roomUUID, title, content, author) {
  let noteUUID = UUID.v4()
  while (rooms[roomUUID].notes.hasOwnProperty(noteUUID)) noteUUID = UUID.v4()
  rooms[roomUUID].notes[noteUUID] = {
    title,
    content,
    author,
    editor: '',
    lastEdit: Date.now(),
  }
  return rooms[roomUUID].notes
}

export function updateNote(roomUUID, noteUUID, title, content, editor) {
  rooms[roomUUID].notes[noteUUID] = {
    ...rooms[roomUUID].notes[noteUUID],
    title,
    content,
    editor
  }
  return rooms[roomUUID].notes
}

export function deleteNote(roomUUID, noteUUID) {
  delete rooms[roomUUID].notes[noteUUID]
  return rooms[roomUUID].notes
}
