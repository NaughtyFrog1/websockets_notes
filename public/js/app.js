const socket = io()

const noteForm = document.querySelector('#noteForm')
const noteTitle = document.querySelector('#title')
const noteDesc = document.querySelector('#description')



noteForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Pasamos como parametro el nombre del evento e información
  socket.emit('client:newNote', {
    title: noteTitle.value,
    desc: noteDesc.value,
  })

  socket.on('server:getNewNote', (data) => {
    console.log(data)
  })
})
