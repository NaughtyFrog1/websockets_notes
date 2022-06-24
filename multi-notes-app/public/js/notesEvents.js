import { noteCreate, noteUpdate } from './socket.js'

const form = document.querySelector('#notesForm')
const formTitle = document.querySelector('#notesFormTitle')
const formContent = document.querySelector('#notesFormContent')

function handleSubmit(e) {
  e.preventDefault()
  if (form.dataset.id === '') {
    noteCreate(formTitle.value, formContent.value)
  } else {
    noteUpdate(form.dataset.id, formTitle.value, formContent.value)
  }

  form.dataset.id = ''
  formTitle.value = ''
  formContent.value = ''
  formTitle.focus()
}

export function addNotesEvents() {
  form.addEventListener('submit', handleSubmit)
}

export function removeNotesEvents() {
  form.removeEventListener('submit', handleSubmit)
}
