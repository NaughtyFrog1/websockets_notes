import { addNotesEvents } from './notesEvents.js'
import { noteDelete, noteRead } from './socket.js'

export function formatUuidInput(e) {
  if (
    (e.key !== 'Backspace' && e.target.value.length === 8) ||
    e.target.value.length === 13 ||
    e.target.value.length === 18 ||
    e.target.value.length === 23
  ) {
    e.target.value += '-'
  }
}

export function renderErrors(errors, errorsElement) {
  errorsElement.innerText = errors.join('\n')
}

export function showNotesSection(roomUUID) {
  document.querySelector('#loginSection').classList.add('d-none')
  document.querySelector('#notesSection').classList.remove('d-none')
  document.querySelector('#notesRoomUUID').innerText = roomUUID
  addNotesEvents()
}

function getLastEditStr(author, editor, lastEdit) {
  const date = new Date(lastEdit)
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  if (editor === '') {
    return `${author} on ${monthNames[date.getMonth()]} ${date.getDate() + 1}`
  } else {
    return `${editor} on ${monthNames[date.getMonth()]} ${
      date.getDate() + 1
    } (edited)`
  }
}

export function renderNote(uuid, { title, content, author, editor, lastEdit }) {
  const div = document.createElement('div')
  div.className = 'card mb-4'
  div.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">${title}</h5>
        <div>
          <button class="btn btn-sm btn-outline-dark deleteNote">
            <i class="bi bi-x-lg"></i>
          </button>
          <button class="btn btn-sm btn-outline-dark updateNote">
            <i class="bi bi-pen"></i>
          </button>
        </div>
      </div>
      <p class="card-text">${content}</p>
      <p class="card-text">
        <small class="text-muted">
          ${getLastEditStr(author, editor, lastEdit)}
        </small>
      </p>
    </div>
  `

  div.querySelector('.deleteNote').addEventListener('click', () => {
    noteDelete(uuid)
  })

  div.querySelector('.updateNote').addEventListener('click', () => {
    noteRead(uuid)
  })

  return div
}

export function renderNotes(notes) {
  const notesList = document.querySelector('#notesNotesList')
  notesList.innerHTML = ''
  Object.keys(notes).forEach((noteUUID) => {
    notesList.append(renderNote(noteUUID, notes[noteUUID]))
  })
}

export function updateForm(noteUUID, title, content) {
  const form = document.querySelector('#notesForm')
  const formTitle = document.querySelector('#notesFormTitle')
  const formContent = document.querySelector('#notesFormContent')

  form.dataset.id = noteUUID
  formTitle.value = title
  formContent.value = content
}
