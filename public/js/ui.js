/**
 * Archivo que guarda las funciones para renderizar elementos
 */

import { deleteNote } from './sockets.js'

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

  const btnDelete = div.querySelector('.deleteNote')
  const btnUpdate = div.querySelector('.updateNote')

  btnDelete.addEventListener('click', () => {
    deleteNote(div.dataset.id)
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
