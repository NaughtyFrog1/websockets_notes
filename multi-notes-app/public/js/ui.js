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
}
