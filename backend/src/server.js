const express = require('express')
const http = require('http')
const cors = require('cors')
const { WebSocketServer } = require('ws')
const {
  createRoom,
  getRoom,
  joinRoom,
  nextRound,
  removeSocket,
  resolveRound,
  sanitizeRoom,
  startGame,
  tapBalloon
} = require('./game/store')

const PORT = Number(process.env.PORT || 3001)
const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server, path: '/ws' })

const clients = new Map()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'balloon-blindbox-server',
    transport: 'websocket',
    timestamp: Date.now()
  })
})

app.get('/rooms/:roomId', (req, res) => {
  const room = getRoom((req.params.roomId || '').toUpperCase())
  if (!room) {
    return res.status(404).json({ message: 'Room not found' })
  }
  return res.json(sanitizeRoom(room))
})

function safeSend(socket, payload) {
  if (!socket || socket.readyState !== 1) {
    return
  }
  socket.send(JSON.stringify(payload))
}

function emitError(socket, message) {
  safeSend(socket, {
    event: 'room:error',
    payload: { message }
  })
}

function emitAck(socket, ackId, ok, payload = {}) {
  safeSend(socket, {
    event: 'ack',
    ackId,
    payload: {
      ok,
      ...payload
    }
  })
}

function emitRoomState(roomId) {
  const room = getRoom(roomId)
  if (!room) {
    return
  }

  const sanitized = sanitizeRoom(room)
  room.players.forEach((player) => {
    const socket = clients.get(player.socketId)
    safeSend(socket, {
      event: 'room:state',
      payload: {
        room: sanitized
      }
    })
  })
}

function attachSession(socket, roomId, playerId, playerName) {
  socket.session = {
    roomId,
    playerId,
    playerName
  }
}

function handleEvent(socket, message) {
  const { event, payload = {}, ackId = '' } = message || {}
  const session = socket.session || {}

  try {
    if (event === 'room:create') {
      const { room, player } = createRoom(payload.playerName || 'Host', socket._socketKey)
      attachSession(socket, room.id, player.id, player.name)
      emitRoomState(room.id)
      emitAck(socket, ackId, true, {
        roomId: room.id,
        playerId: player.id,
        room: sanitizeRoom(room)
      })
      return
    }

    if (event === 'room:join') {
      const roomId = (payload.roomId || '').toUpperCase()
      const { room, player } = joinRoom(roomId, payload.playerName || 'Player', socket._socketKey)
      attachSession(socket, room.id, player.id, player.name)
      emitRoomState(room.id)
      emitAck(socket, ackId, true, {
        roomId: room.id,
        playerId: player.id,
        room: sanitizeRoom(room)
      })
      return
    }

    if (event === 'room:sync') {
      const room = getRoom((payload.roomId || session.roomId || '').toUpperCase())
      if (!room) {
        throw new Error('ROOM_NOT_FOUND')
      }
      emitAck(socket, ackId, true, {
        room: sanitizeRoom(room),
        playerId: session.playerId || payload.playerId || ''
      })
      return
    }

    if (event === 'game:start') {
      const room = startGame((payload.roomId || session.roomId || '').toUpperCase(), payload.playerId || session.playerId)
      emitRoomState(room.id)
      emitAck(socket, ackId, true, {
        room: sanitizeRoom(room)
      })
      return
    }

    if (event === 'balloon:tap') {
      const result = tapBalloon((payload.roomId || session.roomId || '').toUpperCase(), payload.playerId || session.playerId)
      emitRoomState(result.room.id)
      emitAck(socket, ackId, true, {
        exploded: result.exploded,
        room: sanitizeRoom(result.room)
      })
      return
    }

    if (event === 'round:resolve') {
      const room = resolveRound(
        (payload.roomId || session.roomId || '').toUpperCase(),
        payload.actorPlayerId || session.playerId,
        payload.targetPlayerIds
      )
      emitRoomState(room.id)
      emitAck(socket, ackId, true, {
        room: sanitizeRoom(room)
      })
      return
    }

    if (event === 'round:next') {
      const room = nextRound((payload.roomId || session.roomId || '').toUpperCase())
      emitRoomState(room.id)
      emitAck(socket, ackId, true, {
        room: sanitizeRoom(room)
      })
      return
    }

    throw new Error('UNKNOWN_EVENT')
  } catch (error) {
    emitError(socket, error.message)
    emitAck(socket, ackId, false, {
      message: error.message
    })
  }
}

wss.on('connection', (socket, req) => {
  const socketKey = `${req.socket.remoteAddress || 'socket'}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
  socket._socketKey = socketKey
  clients.set(socketKey, socket)

  safeSend(socket, {
    event: 'socket:ready',
    payload: {
      message: 'connected'
    }
  })

  socket.on('message', (buffer) => {
    try {
      const text = buffer.toString()
      const data = JSON.parse(text)
      handleEvent(socket, data)
    } catch (error) {
      emitError(socket, 'INVALID_MESSAGE')
    }
  })

  socket.on('close', () => {
    clients.delete(socketKey)
    const result = removeSocket(socketKey)
    if (!result || result.deleted) {
      return
    }
    emitRoomState(result.roomId)
  })
})

server.listen(PORT, () => {
  console.log(`balloon-blindbox-server listening on :${PORT}`)
})
