import { formatUuidInput, renderErrors } from './ui.js'

function validateUsername(input) {
  const username = input.value.trim().replace(/\s+/g, ' ')
  const errors = []
  if (username === '') errors.push('Username is required')
  else if (username.length < 2) errors.push('Username is too short')
  else if (username.length >= 20) errors.push('Username is too long')
  return { data: username, errors }
}

function validateRoomId(input) {
  const errors = []
  if (input.value === '') errors.push('Room ID is required')
  else if (input.value !== 36) errors.push('Room ID is incorrect')
  return { data: input.value, errors }
}

window.addEventListener('DOMContentLoaded', () => {
  const loginInputUsername = document.querySelector('#loginUsername')
  const loginInputRoomId = document.querySelector('#loginRoomId')
  const loginBtnConnect = document.querySelector('#loginBtnConnect')
  const loginBtnCreate = document.querySelector('#loginBtnCreate')

  loginInputUsername.addEventListener('blur', (e) => {
    const { data, errors } = validateUsername(e.target)
    renderErrors(errors, document.querySelector('#loginUsernameErrors'))
    e.target.value = data
  })

  loginInputRoomId.addEventListener('keypress', formatUuidInput)
  loginInputRoomId.addEventListener('blur', (e) => {
    const { errors } = validateRoomId(e.target.value)
    renderErrors(errors, document.querySelector('#loginRoomIdErrors'))
  })

  loginBtnCreate.addEventListener('click', () => {
    const { data, errors } = validateUsername(loginInputUsername)
    renderErrors(errors, document.querySelector('#loginUsernameErrors'))
    
    if (errors.length > 0) return

    loginBtnCreate.disabled = true
    // create room
  })
})
