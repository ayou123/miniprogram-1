const { createRound, drawBlindBox, pickQuestion } = require('./engine')

const rooms = new Map()

function createPlayer(playerName, socketId) {
  return {
    id: `player_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: playerName,
    socketId
  }
}

function createRoom(hostName, socketId) {
  const roomId = Math.random().toString(36).slice(2, 8).toUpperCase()
  const host = createPlayer(hostName, socketId)
  const room = {
    id: roomId,
    hostPlayerId: host.id,
    players: [host],
    currentTurnIndex: 0,
    status: 'lobby',
    round: createRound(),
    createdAt: Date.now()
  }
  rooms.set(roomId, room)
  return { room, player: host }
}

function joinRoom(roomId, playerName, socketId) {
  const room = rooms.get(roomId)
  if (!room) {
    throw new Error('ROOM_NOT_FOUND')
  }
  if (room.status !== 'lobby') {
    throw new Error('GAME_ALREADY_STARTED')
  }
  const player = createPlayer(playerName, socketId)
  room.players.push(player)
  return { room, player }
}

function getRoom(roomId) {
  return rooms.get(roomId)
}

function findRoomBySocketId(socketId) {
  for (const room of rooms.values()) {
    const player = room.players.find((item) => item.socketId === socketId)
    if (player) {
      return room
    }
  }
  return null
}

function sanitizeRoom(room) {
  if (!room) {
    return null
  }
  return {
    id: room.id,
    hostPlayerId: room.hostPlayerId,
    players: room.players.map((player, index) => ({
      id: player.id,
      name: player.name,
      order: index
    })),
    currentTurnIndex: room.currentTurnIndex,
    currentPlayerId: room.players[room.currentTurnIndex] ? room.players[room.currentTurnIndex].id : '',
    status: room.status,
    round: room.round
  }
}

function startGame(roomId, playerId) {
  const room = getRoom(roomId)
  if (!room) {
    throw new Error('ROOM_NOT_FOUND')
  }
  if (room.hostPlayerId !== playerId) {
    throw new Error('ONLY_HOST_CAN_START')
  }
  if (room.players.length < 2) {
    throw new Error('NEED_AT_LEAST_TWO_PLAYERS')
  }
  room.status = 'playing'
  room.currentTurnIndex = 0
  room.round = createRound()
  return room
}

function tapBalloon(roomId, playerId) {
  const room = getRoom(roomId)
  if (!room) {
    throw new Error('ROOM_NOT_FOUND')
  }
  if (room.status !== 'playing') {
    throw new Error('GAME_NOT_PLAYING')
  }

  const currentPlayer = room.players[room.currentTurnIndex]
  if (!currentPlayer || currentPlayer.id !== playerId) {
    throw new Error('NOT_YOUR_TURN')
  }

  room.round.clickCount += 1

  if (room.round.clickCount >= room.round.threshold) {
    const result = drawBlindBox()
    const question = pickQuestion(room.round.clickCount, result.level)
    room.round.status = 'exploded'
    room.round.loserPlayerId = playerId
    room.round.result = result
    room.round.question = question
    room.status = 'resolving'
    return {
      exploded: true,
      room
    }
  }

  room.currentTurnIndex = (room.currentTurnIndex + 1) % room.players.length
  return {
    exploded: false,
    room
  }
}

function resolveRound(roomId, actorPlayerId, targetPlayerIds) {
  const room = getRoom(roomId)
  if (!room) {
    throw new Error('ROOM_NOT_FOUND')
  }
  if (room.status !== 'resolving') {
    throw new Error('ROUND_NOT_RESOLVING')
  }
  if (room.round.loserPlayerId !== actorPlayerId) {
    throw new Error('ONLY_LOSER_CAN_RESOLVE')
  }

  const resultLevel = room.round.result.level
  const normalizedTargets = Array.isArray(targetPlayerIds) ? targetPlayerIds.filter(Boolean) : []
  let finalTargets = []

  if (resultLevel === 'N') {
    finalTargets = [actorPlayerId]
  } else if (resultLevel === 'SR') {
    finalTargets = [normalizedTargets[0] || actorPlayerId]
  } else if (resultLevel === 'SSR') {
    finalTargets = Array.from(new Set([actorPlayerId, normalizedTargets[0]].filter(Boolean)))
    if (finalTargets.length < 2) {
      throw new Error('SSR_REQUIRES_ONE_TARGET')
    }
  } else if (resultLevel === 'UR') {
    finalTargets = [normalizedTargets[0]]
    if (!finalTargets[0]) {
      throw new Error('UR_REQUIRES_ONE_TARGET')
    }
  }

  room.round.resolution = {
    actorPlayerId,
    targetPlayerIds: finalTargets
  }
  room.status = 'finished'
  return room
}

function nextRound(roomId) {
  const room = getRoom(roomId)
  if (!room) {
    throw new Error('ROOM_NOT_FOUND')
  }

  const loserIndex = room.players.findIndex((item) => item.id === room.round.loserPlayerId)
  room.currentTurnIndex = loserIndex >= 0 ? (loserIndex + 1) % room.players.length : 0
  room.status = 'playing'
  room.round = createRound()
  return room
}

function removeSocket(socketId) {
  const room = findRoomBySocketId(socketId)
  if (!room) {
    return null
  }

  const playerIndex = room.players.findIndex((item) => item.socketId === socketId)
  if (playerIndex < 0) {
    return null
  }

  const [removed] = room.players.splice(playerIndex, 1)

  if (!room.players.length) {
    rooms.delete(room.id)
    return { roomId: room.id, removedPlayerId: removed.id, deleted: true }
  }

  if (room.hostPlayerId === removed.id) {
    room.hostPlayerId = room.players[0].id
  }

  if (room.currentTurnIndex >= room.players.length) {
    room.currentTurnIndex = 0
  }

  return { roomId: room.id, removedPlayerId: removed.id, deleted: false, room }
}

module.exports = {
  createRoom,
  getRoom,
  joinRoom,
  nextRound,
  removeSocket,
  resolveRound,
  sanitizeRoom,
  startGame,
  tapBalloon
}
