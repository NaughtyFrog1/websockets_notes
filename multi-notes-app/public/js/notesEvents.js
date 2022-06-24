import { noteCreate } from './socket.js'

const form = document.querySelector('#notesForm')
const formTitle = document.querySelector('#notesFormTitle')
const formContent = document.querySelector('#notesFormContent')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (form.dataset.create === 'true') {
    noteCreate(formTitle.value, formContent.value)
  } else {
    console.log('update')
  }

  formTitle.value = ''
  formContent.value = ''
  formTitle.focus()
})

export function addNotesEvents() {}

export function removeNotesEvents() {}
