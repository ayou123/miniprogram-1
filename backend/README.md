# Balloon Blindbox Backend

This is a separate Node.js backend for realtime multiplayer rounds.

## Why the backend is needed

For true multiplayer, the game needs one shared authority for:

- room creation and join flow
- player order and current turn
- balloon tap count and hidden explosion threshold
- blindbox result and punishment selection
- round resolution for `N`, `SR`, `SSR`, `UR`

Without a backend, each client would calculate state locally and the room would diverge quickly.

## Tech choice

- `Express`: health check and room query endpoint
- native `WebSocket` via `ws`: realtime room events
- in-memory room store: simplest first version

This is good for local development and gameplay validation. For production, move room state to Redis or a database.

## Start

```bash
cd backend
npm install
npm run dev
```

Default port:

```text
3001
```

Health check:

```text
GET /health
```

Room snapshot:

```text
GET /rooms/:roomId
```

## Socket events

### WebSocket endpoint

```text
ws://<host>:3001/ws
```

All messages use:

```json
{
  "event": "room:create",
  "ackId": "ack_1",
  "payload": {}
}
```

### Client -> server

- `room:create`
- payload: `{ playerName }`
- `room:join`
  - payload: `{ roomId, playerName }`
- `game:start`
  - payload: `{ roomId, playerId }`
- `balloon:tap`
  - payload: `{ roomId, playerId }`
- `round:resolve`
  - payload: `{ roomId, actorPlayerId, targetPlayerIds }`
- `round:next`
  - payload: `{ roomId }`
- `room:sync`
  - payload: `{ roomId, playerId }`

### Server -> client

- `socket:ready`
- `ack`
  - payload: `{ ok, ... }`
- `room:state`
  - full room snapshot after every state change
- `room:error`
  - payload: `{ message }`

## Round rules in the backend

- Players join a room in lobby state.
- Host starts the game.
- Players tap in fixed order.
- The player who causes the explosion becomes `loserPlayerId`.
- Backend draws:
  - blindbox rarity
  - actual punishment question
- Resolution:
  - `N`: loser does it
  - `SR`: loser redirects to one target or keeps it
  - `SSR`: loser plus one target both do it
  - `UR`: loser is exempt and must nominate one target
- Next round starts from the player after the loser.

## Current limitations

- room state is only in memory
- no persistence after server restart
- no authentication
- no anti-cheat
- mini program frontend is being wired to this backend

## Recommended next step

Wire the mini program to these socket events, then replace the current single-player local flow with room state from the backend.
