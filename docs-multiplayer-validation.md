# Multiplayer Validation Checklist

## Backend startup

1. Open terminal in `backend`
2. Run `npm install`
3. Run `npm run dev`
4. Confirm `GET /health` returns `ok: true`
5. Confirm WebSocket endpoint is reachable at `/ws`

## Mini program setup

1. Open the mini program in WeChat DevTools
2. Go to game start page
3. Open multiplayer room page
4. Set server URL to:

```text
ws://<your-lan-ip>:3001/ws
```

Use LAN IP instead of `127.0.0.1` when testing with multiple devices.

## Room flow

1. Client A enters nickname and creates room
2. Confirm room code is shown
3. Client B enters nickname and joins room using the same room code
4. Confirm both clients show the same player list
5. Confirm host badge is correct

## Start flow

1. Host taps start
2. Confirm both clients leave lobby state
3. Confirm both clients enter multiplayer round page or can navigate there
4. Confirm current turn is identical on both clients

## Turn flow

1. Only current player can tap
2. Non-current player sees waiting state
3. One valid tap increments shared tap count on both clients
4. Turn advances to the next player on both clients

## Explosion and resolution

1. Continue until the balloon explodes
2. Confirm both clients show:
   - loser player
   - blindbox rarity
   - punishment question
3. Confirm only loser can resolve the round
4. Validate each case:
   - `N`: no target needed
   - `SR`: one redirect target optional, defaults to self if not selected
   - `SSR`: one partner required
   - `UR`: one substitute required

## Next round

1. After resolution, start next round
2. Confirm next round begins with the player after the loser
3. Confirm tap count resets to `0`
4. Confirm room remains synchronized

## Known gaps to watch

- no persistence after backend restart
- no reconnect recovery
- no authentication
- no room cleanup timeout
