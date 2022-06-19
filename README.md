# WebSockets Notes

> Youtube - Fazt Code. Nodejs Socketio CRUD  
> [Video del tutorial](https://www.youtube.com/watch?v=zWax5QCWCXM)




## Crear servidor

`socket.io` permite configurar los websockets en el servidor. Permite enviar y recibir eventos a través de la conexión de sockets.

```javascript
import express from 'express'
import http from 'http'
import WebSocket from 'socket.io'

// Configurar la aplicación de express
const app = express() 
// Crear módulo http utilizando la configuración de express (app)
const httpServer = http.createServer(app) 
// Crea el servidor de WebSockets
const io = new WebSocket.Server(httpServer)

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('Nueva conexión')
  console.log(socket.id)
})

// Levantar servidor
httpServer.listen(3002, () => {
  console.log(
    '\n\x1b[1m>>> \x1b[32mServer listening on \x1b[4mhttp://localhost:3000\x1b[0m\n\n'
  )
})
```
*src/index.js*
- `socket` contiene información del cliente. Es un objeto similar al request/response de node
  - Con `socket.id` podemos identificar al cliente. Cada cliente tiene su propio id, incluso si son dentro del mismo dispositivo, pero en pestañas diferentes del navegador.
- Cuando el cliente se conecta al servidor se dispara el evento `connection` en el servidor
- No levantamos el servidor con `app.listen(...)` porque es solo express. Al usar `httpServer` estamos levantando el servidor con express y con los websockets.

Al reiniciar el servidor se pierde la conexión, pero como el script de sockets.io está desde el cliente, intenta reconectarse. Tener en cuenta que, al reconectarse, el id del cliente cambia.




## Enviar y recibir eventos

Con `socket.emit(<nombre_del_evento)` podemos enviar eventos, que luego podemos escucharlos haciendo `socket.on(<nombre_del_evento>, callback)`. Podemos enviar o recibir eventos desde el cliente al servidor y viceversa.

```javascript
io.on('connection', (socket) => {
  console.log('Nueva conexión: ', socket.id)
  socket.emit(`ping`)

  socket.on('timeout', () => {
    console.log('Timeout on: ', socket.id)
  })
})
```
*src/index.js*


```javascript
const socket = io()

socket.on()

socket.on('ping', () => {
  console.log('escuchado')
})

setTimeout(() => {
  socket.emit('timeout')
  console.log('timeout')
}, 2000)

```
*public/js/app.js*
- `io` es una variable global que viene desde *socket.io.js*.
- `io` recibe la conexión con el servidor de websockets como parámetro, al no pasarle nada se conecta automáticamente al mismo servidor desde donde es llamado. Devuelve un objeto con la conexión al websocket del servidor
- `io` crea el servidor para los sockets, pero las conexiones con cada cliente estan representadas por el parámetro `socket` en `io.on('connection', (socket) => {`. Por ello es que cuando queremos recibir un evento del cliente devemos hacerlo desde dentro de ese arrow funtion.
