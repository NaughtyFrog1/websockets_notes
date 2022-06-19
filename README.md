# WebSockets Notes

> Youtube - Fazt Code. Nodejs Socketio CRUD  
> [Video del tutorial](https://www.youtube.com/watch?v=zWax5QCWCXM)


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
- No levantamos el servidor con `app.listen(...)` porque es solo express. Al usar `httpServer` estamos levantando el servidor con express y con los websockets.



Al reiniciar el servidor se pierde la conexión, pero como el script de sockets.io está desde el cliente, intenta reconectarse. Sin embargo, al reconectarse el id del cliente cambia.



Para enviar un evento enviamos los eventos con `socket.emit()`