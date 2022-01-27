const express = require('express')
const app = express()
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')

const server = createServer(app)
const io = new Server(server, { cors: 'http://localhost:3000' })

let rooms = []

app.use(cors())

app.get('/', (req, res) => {
  res.sendStatus(200)
})

// Create a room
app.post('/room', (req, res) => {
  const { name } = req.query
  if (
    name?.length > 0 &&
    !rooms.filter((room) => room?.name === name)?.length
  ) {
    const newData = { name, users: [] }
    rooms.push(newData)
    res.status(200).json(newData)
  } else res.status(409)
})

// Get all rooms
app.get('/rooms', (req, res) => {
  res.send(rooms)
})

function updateStats(currentRoom, users, currentUser, currentUserData) {
  rooms = rooms.map((room) => {
    if (room.name === currentRoom.name)
      return {
        ...currentRoom,
        users: users.map((socketId) => {
          if (socketId === currentUser)
            return { name: currentUser, score: currentUserData }
          else
            return {
              name: socketId,
              score: room.users.find((u) => u?.name === socketId)?.score ?? 0,
            }
        }),
      }
    else return room
  })
  console.log(rooms.find((r) => r.name === currentRoom.name))
}

io.on('connect', (socket) => {
  console.log(`🚀 socket connected to client ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`👋 socket disconnected from client ${socket.id}`)
  })

  rooms.forEach((room) => {
    const roomIsNotFull =
      !io.sockets.adapter.rooms.get(room.name)?.size ||
      io.sockets.adapter.rooms.get(room.name)?.size < 2

    if (roomIsNotFull) {
      if (rooms.includes(room)) {
        console.log(`gonna add ${socket.id} to ${room.name}`)
        socket.join(room.name)
      }
    }
    // console.log(`rooms -> ${[...io.sockets.adapter.rooms.keys()]}`)
    if (io.sockets.adapter.rooms.has(room.name)) {
      console.log(`🚀 users in ${room.name}:`, [
        ...io.sockets.adapter.rooms.get(room.name).keys(),
      ])
    }
    socket.on(room.name, (msg) => {
      if (
        [...(io.sockets.adapter.rooms.get(room.name)?.keys() || [])].includes(
          socket.id
        )
      ) {
        // Every time a user makes a point
        updateStats(
          room,
          [...io.sockets.adapter.rooms.get(room.name).keys()],
          socket.id,
          msg
        )
        console.log(`client ${socket.id} in ${room.name} says: ${msg}`)
      }
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
