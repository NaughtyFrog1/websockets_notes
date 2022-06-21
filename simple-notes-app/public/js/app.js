import { saveNote, updateNote } from './sockets.js'

const noteForm = document.querySelector('#noteForm')
const noteTitle = document.querySelector('#title')
const noteDesc = document.querySelector('#description')

noteForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (noteForm.dataset.noteId) {
    updateNote(noteForm.dataset.noteId, noteTitle.value, noteDesc.value)
    noteForm.dataset.noteId = ''
  } else {
    saveNote(noteTitle.value, noteDesc.value)
  }

  noteTitle.value = ''
  noteDesc.value = ''
  noteTitle.focus()
})
