const express = require('express')
const app = express()
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')

const server = createServer(app)
const io = new Server(server, { cors: 'http://localhost:3000' })

const rooms = new Set()

app.use(cors())

app.get('/', (req, res) => {
  res.sendStatus(200)
})

// Create a room
app.post('room', (req, res) => {
  const { name } = req.params
  if (name.length > 0 && !rooms.has(name)) {
    rooms.add(name)
    res.status(200).json({ name })
  } else res.status(409)
})

// Get all rooms
app.get('rooms', (req, res) => {
  res.send(JSON.stringify(rooms.toJSON()))
})

io.on('connect', (socket) => {
  console.log(`🚀 socket connected to client ${socket.id}`)

  socket.on('disconnect', (socket) => {
    console.log(`socket disconnected from client ${socket.id}`)
  })

  socket.on('message', (msg) => {
    // io.sockets.emit('message', "hi, i'm the server")
    console.log('msg from client ->', msg)
  })

  rooms.forEach((room) => {
    socket.on(room, (msg) => {
      console.log(`client ${socket.id} on room ${room} says: ${msg}`)
    })
  })
})

server.listen(3333, () => {
  console.log('🔥 listening on port 3333')
})

// setInterval(function () {
//   var msg = Math.random()
//   io.emit('message', msg)
// }, 2000)
