import { saveNote } from './sockets.js'

const noteForm = document.querySelector('#noteForm')
const noteTitle = document.querySelector('#title')
const noteDesc = document.querySelector('#description')
const notes = document.querySelector('#notes')

noteForm.addEventListener('submit', (e) => {
  e.preventDefault()
  saveNote(noteTitle.value, noteDesc.value)
})
