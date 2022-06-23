import { roomCreate, roomJoin } from './socket.js'
import { formatUuidInput, renderErrors } from './ui.js'

const loginInputUsername = document.querySelector('#loginUsername')
const loginInputRoomId = document.querySelector('#loginRoomId')
const loginBtnConnect = document.querySelector('#loginBtnConnect')
const loginBtnCreate = document.querySelector('#loginBtnCreate')

function validateUsername(value) {
  const username = value.trim().replace(/\s+/g, ' ')
  const errors = []
  if (username === '') errors.push('Username is required')
  else if (username.length < 2) errors.push('Username is too short')
  else if (username.length >= 20) errors.push('Username is too long')
  return { data: username, errors }
}

function validateRoomId(value) {
  const errors = []
  if (value === '') errors.push('Room ID is required')
  else if (value.length !== 36) errors.push('Room ID is incorrect')
  return { data: value, errors }
}

function handleInputUsernameBlur(e) {
  const { data, errors } = validateUsername(e.target.value)
  renderErrors(errors, document.querySelector('#loginUsernameErrors'))
  e.target.value = data
}

function handleInputRoomIdBlur(e) {
  const { errors } = validateRoomId(e.target.value)
  renderErrors(errors, document.querySelector('#loginRoomIdErrors'))
}

function handleBtnCreateClick() {
  const { data, errors } = validateUsername(loginInputUsername.value)
  renderErrors(errors, document.querySelector('#loginUsernameErrors'))

  if (errors.length > 0) return

  loginBtnCreate.disabled = true
  loginBtnConnect.disabled = true
  roomCreate(data)
}

function handleBtnConnectClick() {
  const username = validateUsername(loginInputUsername.value)
  const roomId = validateRoomId(loginInputRoomId.value)
  renderErrors(username.errors, document.querySelector('#loginUsernameErrors'))
  renderErrors(roomId.errors, document.querySelector('#loginRoomIdErrors'))

  if (username.errors.length > 0 || roomId.errors.length > 0) return

  loginBtnCreate.disabled = true
  loginBtnConnect.disabled = true
  roomJoin(roomId.data, username.data)
}

export function addLoginEvents() {
  loginInputUsername.addEventListener('blur', handleInputUsernameBlur)
  loginInputRoomId.addEventListener('keypress', formatUuidInput)
  loginInputRoomId.addEventListener('blur', handleInputRoomIdBlur)
  loginBtnCreate.addEventListener('click', handleBtnCreateClick)
  loginBtnConnect.addEventListener('click', handleBtnConnectClick)
}

export function removeLoginEvents() {
  loginInputUsername.removeEventListener('blur', handleInputUsernameBlur)
  loginInputRoomId.removeEventListener('keypress', formatUuidInput)
  loginInputRoomId.removeEventListener('blur', handleInputRoomIdBlur)
  loginBtnCreate.removeEventListener('click', handleBtnCreateClick)
}
