# Multiplayer Upgrade Plan

## Goal

Upgrade the current local single-device game into a room-based multiplayer game for WeChat mini program users.

## Why a backend is required

The following game state must be owned by one shared authority:

- room creation and join flow
- player order
- current turn
- hidden explosion threshold
- balloon tap count
- loser identification
- blindbox rarity draw
- punishment question draw
- round resolution for `N / SR / SSR / UR`

Without a backend, each client will drift and the room will become inconsistent.

## Transport choice

Use native WebSocket instead of Socket.IO.

Reason:

- WeChat mini program supports `wx.connectSocket` directly
- raw WebSocket is simpler to control in mini program runtime
- protocol becomes explicit and easier to debug

## Room model

Each room contains:

- `id`
- `hostPlayerId`
- `players[]`
- `currentTurnIndex`
- `status`: `lobby | playing | resolving | finished`
- `round`

Round state contains:

- `clickCount`
- `threshold`
- `status`
- `loserPlayerId`
- `result`
- `question`
- `resolution`

## Gameplay rules

1. Host creates a room.
2. Other players join by room code.
3. Host starts the game after at least 2 players join.
4. Players tap in fixed order.
5. The player who causes the balloon to explode becomes the loser of the round.
6. Backend draws:
   - rarity result
   - one real punishment question
7. Resolution:
   - `N`: loser executes punishment
   - `SR`: loser may redirect punishment to one target player
   - `SSR`: loser and one target player both execute punishment
   - `UR`: loser is exempt and must designate one substitute target
8. Next round starts from the player after the loser.

## Frontend page changes

### Existing pages

- `pages/index/index`
  - keep as top-level hub
  - add multiplayer entry

- `pages/start/index`
  - show two modes:
    - local mode
    - multiplayer mode

### New pages

- `pages/room/index`
  - create room
  - join room
  - show player list
  - host starts game

- `pages/online-balloon/index`
  - render current room state
  - show current player
  - allow tap only for the active player
  - show explosion result and target selection for `SR / SSR / UR`
  - continue to next round

## WebSocket protocol

All messages use JSON with the shape:

```json
{
  "event": "room:create",
  "payload": {}
}
```

Server broadcasts room snapshots with:

```json
{
  "event": "room:state",
  "payload": {
    "room": {}
  }
}
```

### Client -> server events

- `room:create`
- `room:join`
- `game:start`
- `balloon:tap`
- `round:resolve`
- `round:next`
- `room:sync`

### Server -> client events

- `room:created`
- `room:joined`
- `room:state`
- `room:error`

## Frontend storage

Keep these local keys:

- `playerName`
- `onlineServerUrl`
- `onlineRoomSession`

`onlineRoomSession` stores:

- `roomId`
- `playerId`
- `playerName`

## Minimum viable implementation order

1. Write protocol and todo checklist
2. Replace backend Socket.IO with native WebSocket
3. Build mini program realtime client utility
4. Add room page
5. Add multiplayer round page
6. Connect start page entry
7. Run manual room flow validation

## Known constraints

- current backend room state is in memory only
- restart clears all rooms
- no authentication yet
- no reconnect recovery yet
- no cloud deployment yet
