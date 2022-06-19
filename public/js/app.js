// `io` recibe la conexión con el servidor de websockets como parámetro. Al no pasarle nada se conecta automáticamente al mismo servidor desde donde es servido.
// `io` devuelve un objeto con la conexión a los websockets del servidor.

const socket = io()

socket.on()

socket.on('ping', () => {
  console.log('escuchado')
})

setTimeout(() => {
  socket.emit('timeout')
  console.log('timeout')
}, 2000)
