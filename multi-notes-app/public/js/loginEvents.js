import { createRoom } from './socket.js'
import { formatUuidInput, renderErrors } from './ui.js'

const loginInputUsername = document.querySelector('#loginUsername')
const loginInputRoomId = document.querySelector('#loginRoomId')
const loginBtnConnect = document.querySelector('#loginBtnConnect')
const loginBtnCreate = document.querySelector('#loginBtnCreate')

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

function handleInputUsernameBlur(e) {
  const { data, errors } = validateUsername(e.target)
  renderErrors(errors, document.querySelector('#loginUsernameErrors'))
  e.target.value = data
}

function handleInputRoomIdBlur(e) {
  const { errors } = validateRoomId(e.target.value)
  renderErrors(errors, document.querySelector('#loginRoomIdErrors'))
}

function handleBtnCreateClick() {
  console.log('click!')

  const { data, errors } = validateUsername(loginInputUsername)
  renderErrors(errors, document.querySelector('#loginUsernameErrors'))

  if (errors.length > 0) return

  loginBtnCreate.disabled = true
  createRoom(data)
}

export function addLoginEvents() {
  loginInputUsername.addEventListener('blur', handleInputUsernameBlur)
  loginInputRoomId.addEventListener('keypress', formatUuidInput)
  loginInputRoomId.addEventListener('blur', handleInputRoomIdBlur)
  loginBtnCreate.addEventListener('click', handleBtnCreateClick)
}

export function removeLoginEvents() {
  loginInputUsername.removeEventListener('blur', handleInputUsernameBlur)
  loginInputRoomId.removeEventListener('keypress', formatUuidInput)
  loginInputRoomId.removeEventListener('blur', handleInputRoomIdBlur)
  loginBtnCreate.removeEventListener('click', handleBtnCreateClick)
}
