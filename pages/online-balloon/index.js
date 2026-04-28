const { getLanguage, t } = require('../../utils/i18n')
const { request, subscribe } = require('../../utils/realtime')
const { getRoomSession } = require('../../utils/online-session')

function createStars(star) {
  return Array.from({ length: star || 0 }, (_, index) => index)
}

Page({
  data: {
    lang: 'en',
    text: {},
    room: null,
    roomId: '',
    playerId: '',
    targetPlayerId: '',
    selectablePlayers: [],
    display: {},
    isMyTurn: false,
    canResolve: false
  },
  onLoad(options) {
    const lang = getLanguage()
    const text = t(lang)
    const session = getRoomSession()
    wx.setNavigationBarTitle({
      title: text.online.nav
    })
    this.unsubscribeState = subscribe('room:state', ({ room }) => {
      this.applyRoom(room)
    })
    this.unsubscribeOpen = subscribe('socket:open', () => {
      this.syncRoom()
    })
    this.unsubscribeError = subscribe('room:error', ({ message }) => {
      if (!message) {
        return
      }
      wx.showToast({
        title: message,
        icon: 'none'
      })
    })
    this.setData({
      lang,
      text,
      roomId: (options.roomId || session.roomId || '').toUpperCase(),
      playerId: session.playerId || ''
    })
  },
  onShow() {
    this.syncRoom()
  },
  onUnload() {
    if (this.unsubscribeState) {
      this.unsubscribeState()
    }
    if (this.unsubscribeOpen) {
      this.unsubscribeOpen()
    }
    if (this.unsubscribeError) {
      this.unsubscribeError()
    }
  },
  syncRoom() {
    const session = getRoomSession()
    if (!session.roomId) {
      return
    }
    request('room:sync', {
      roomId: session.roomId,
      playerId: session.playerId
    })
      .then((response) => {
        this.applyRoom(response.room)
      })
      .catch(() => {})
  },
  applyRoom(room) {
    if (!room) {
      return
    }
    const targetOptions = this.getSelectablePlayers(room)
    const preferredTarget = targetOptions.some((item) => item.id === this.data.targetPlayerId)
      ? this.data.targetPlayerId
      : (targetOptions[0] ? targetOptions[0].id : '')
    this.setData({
      room,
      roomId: room.id,
      targetPlayerId: preferredTarget,
      selectablePlayers: targetOptions,
      display: this.buildDisplay(room),
      isMyTurn: room.status === 'playing' && room.currentPlayerId === this.data.playerId,
      canResolve: room.status === 'resolving' && room.round && room.round.loserPlayerId === this.data.playerId
    })
  },
  getSelectablePlayers(room = this.data.room) {
    if (!room) {
      return []
    }
    const loserId = room.round ? room.round.loserPlayerId : ''
    const level = room.round && room.round.result ? room.round.result.level : ''
    const players = room.players || []
    if (level === 'SSR') {
      return players.filter((item) => item.id !== loserId)
    }
    if (level === 'SR' || level === 'UR') {
      return players.filter((item) => item.id !== loserId)
    }
    return []
  },
  getCurrentPlayer(room = this.data.room) {
    const players = room && room.players ? room.players : []
    const currentPlayerId = room ? room.currentPlayerId : ''
    return players.find((item) => item.id === currentPlayerId) || null
  },
  getLoserPlayer(room = this.data.room) {
    const players = room && room.players ? room.players : []
    const loserPlayerId = room && room.round ? room.round.loserPlayerId : ''
    return players.find((item) => item.id === loserPlayerId) || null
  },
  chooseTarget(e) {
    this.setData({
      targetPlayerId: e.currentTarget.dataset.id
    })
  },
  tapBalloon() {
    if (!this.data.isMyTurn) {
      return
    }
    request('balloon:tap', {
      roomId: this.data.roomId,
      playerId: this.data.playerId
    }).catch((error) => {
      wx.showToast({
        title: error.message || 'TAP_FAILED',
        icon: 'none'
      })
    })
  },
  resolveRound() {
    const room = this.data.room
    if (!room) {
      return
    }
    const level = room.round && room.round.result ? room.round.result.level : ''
    const targetPlayerIds = level === 'N'
      ? []
      : this.data.targetPlayerId
        ? [this.data.targetPlayerId]
        : []
    request('round:resolve', {
      roomId: this.data.roomId,
      actorPlayerId: this.data.playerId,
      targetPlayerIds
    }).catch((error) => {
      wx.showToast({
        title: error.message || 'RESOLVE_FAILED',
        icon: 'none'
      })
    })
  },
  nextRound() {
    request('round:next', {
      roomId: this.data.roomId
    }).catch((error) => {
      wx.showToast({
        title: error.message || 'NEXT_FAILED',
        icon: 'none'
      })
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  buildDisplay(room = this.data.room) {
    if (!room) {
      return {}
    }
    const currentPlayer = this.getCurrentPlayer(room)
    const loserPlayer = this.getLoserPlayer(room)
    const question = room.round && room.round.question
      ? {
          ...room.round.question,
          type: this.data.text.questions[(room.round.question.type || 'Truth').toLowerCase()] || room.round.question.type,
          content: room.round.question[this.data.lang] || room.round.question.en,
          stars: createStars(Number(room.round.question.targetStar || room.round.question.star || 1))
        }
      : null
    const level = room.round && room.round.result ? room.round.result.level : 'N'
    const resultText = this.data.text.rewards[level] || {}
    const resolutionTargetIds = room.round && room.round.resolution ? room.round.resolution.targetPlayerIds || [] : []
    const resolutionNames = resolutionTargetIds
      .map((id) => (room.players || []).find((item) => item.id === id))
      .filter(Boolean)
      .map((item) => item.name)
    return {
      currentPlayer,
      loserPlayer,
      question,
      result: room.round && room.round.result ? {
        ...room.round.result,
        title: resultText.title || room.round.result.title,
        effect: resultText.effect || room.round.result.effect
      } : null,
      resolutionNames
    }
  }
})
