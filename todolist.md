# Balloon Blindbox Todo List

## Done

### MVP local version

- [x] Home layout
- [x] Nickname input and quick names
- [x] Rule modal
- [x] Balloon page and pump interaction
- [x] Random blast threshold from 5 to 15
- [x] Balloon scaling by click count
- [x] Auto jump to blindbox after burst
- [x] Taunt text switching
- [x] Vibration feedback
- [x] Risk state UI
- [x] Three blindbox cards and flip animation
- [x] Frontend probability logic
- [x] Rarity styles
- [x] Local question bank
- [x] Replay flow
- [x] Result page
- [x] Share entry with `wx.shareAppMessage`
- [x] Added `utils/probability.js`
- [x] Added `utils/questions.js`
- [x] Added `utils/i18n.js`
- [x] Added balloon manual document
- [x] Added blindbox manual document
- [x] Added Chinese and English language switch
- [x] Expanded punishment bank with JSON management and star levels
- [x] Rebuilt home page into a game manager dashboard
- [x] Added punishment sync script for JSON -> JS workflow

## Pending

### Remaining in MVP

- [ ] Real heartbeat and blast audio assets
- [ ] Real-device audio and vibration tuning
- [ ] Better burst image or particle animation assets

### Phase 2

- [x] Multiplayer architecture and protocol doc
- [x] Multiplayer todo checklist
- [x] Replace Socket.IO backend with native WebSocket backend
- [x] Frontend realtime socket utility
- [x] Room create / join page
- [x] Realtime multiplayer balloon page
- [x] Multiplayer result resolution for `N / SR / SSR / UR`
- [x] Start page multiplayer entry
- [x] Manual room flow validation
- [ ] Cloud setup
- [ ] Cloud database `questions` / `rooms`
- [ ] Cloud deployment
- [ ] Reconnect and persistence

## Multiplayer rollout

- [x] Write `docs-multiplayer-plan.md`
- [x] Update `todolist.md` with rollout checklist
- [x] Rebuild `backend/*` to use native WebSocket
- [x] Add `utils/realtime.js`
- [x] Add `pages/room/*`
- [x] Add `pages/online-balloon/*`
- [x] Connect `pages/start/*` to multiplayer flow
- [x] Verify room state sync manually

## File changes

- [x] Rebuilt `pages/index/*` as home
- [x] Added `pages/balloon/*`
- [x] Added `pages/blindbox/*`
- [x] Added `pages/result/*`
- [x] Updated `app.json`
- [x] Updated `app.wxss`
- [x] Added `todolist.md`
