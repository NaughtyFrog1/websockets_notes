/**
 * Archivo que guarda las funciones para renderizar elementos
 */

import { deleteNote, getNote } from './sockets.js'

const notesList = document.querySelector('#notes')

function noteUI({ id, title, desc }) {
  const div = document.createElement('div')
  div.className = 'card mb-2'
  div.dataset.id = id
  div.innerHTML = `
    <div class="card-body d-flex justify-content-between align-items-center">
      <h3 class="card-title m-0">${title}</h3>
      <div>
        <button class="btn btn-sm btn-danger deleteNote">
          delete
        </button>
        <button class="btn btn-sm btn-success updateNote">
          update
        </button>
      </div>
    </div>
    <div class="card-body">
      <p>${desc}</p>
    </div>
  `

  div.querySelector('.deleteNote').addEventListener('click', () => {
    deleteNote(div.dataset.id)
  })
  div.querySelector('.updateNote').addEventListener('click', () => {
    getNote(div.dataset.id)
  })

  return div
}

export function renderNotes(notes) {
  notesList.innerHTML = ''
  notes.forEach((note) => {
    notesList.append(noteUI(note))
  })
}

export function appendNote(note) {
  notesList.append(noteUI(note))
}

export function updateForm(data) {
  const title = document.querySelector('#title')
  const description = document.querySelector('#description')
  const noteForm = document.querySelector('#noteForm')

  noteForm.dataset.noteId = data.id
  title.value = data.title
  description.value = data.desc
}
