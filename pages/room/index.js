const { getLanguage, t } = require('../../utils/i18n')
const { connect, isConnected, request, subscribe } = require('../../utils/realtime')
const {
  getRoomSession,
  getServerUrl,
  setRoomSession,
  setServerUrl
} = require('../../utils/online-session')

Page({
  data: {
    lang: 'en',
    text: {},
    playerName: '',
    serverUrl: '',
    roomCodeInput: '',
    room: null,
    playerId: '',
    connected: false,
    enteredBattle: false,
    isHost: false
  },
  onLoad() {
    const lang = getLanguage()
    const text = t(lang)
    const session = getRoomSession()
    wx.setNavigationBarTitle({
      title: text.room.nav
    })
    this.unsubscribeState = subscribe('room:state', ({ room }) => {
      this.setData({
        room,
        isHost: !!(room && room.hostPlayerId === this.data.playerId)
      })
      if (room && room.status !== 'lobby') {
        this.enterBattle()
      }
    })
    this.unsubscribeOpen = subscribe('socket:open', () => {
      this.setData({ connected: true })
      this.syncRoom()
    })
    this.unsubscribeClose = subscribe('socket:close', () => {
      this.setData({ connected: false })
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
      playerName: wx.getStorageSync('playerName') || text.balloon.anonymous,
      serverUrl: getServerUrl(),
      roomCodeInput: session.roomId || '',
      playerId: session.playerId || '',
      room: null,
      connected: isConnected()
    })
  },
  onShow() {
    const session = getRoomSession()
    if (session.roomId) {
      this.syncRoom()
    }
  },
  onUnload() {
    if (this.unsubscribeState) {
      this.unsubscribeState()
    }
    if (this.unsubscribeOpen) {
      this.unsubscribeOpen()
    }
    if (this.unsubscribeClose) {
      this.unsubscribeClose()
    }
    if (this.unsubscribeError) {
      this.unsubscribeError()
    }
  },
  onPlayerNameInput(e) {
    const playerName = e.detail.value.trim()
    wx.setStorageSync('playerName', playerName)
    this.setData({ playerName })
  },
  onServerInput(e) {
    this.setData({
      serverUrl: e.detail.value.trim()
    })
  },
  onRoomCodeInput(e) {
    this.setData({
      roomCodeInput: e.detail.value.trim().toUpperCase()
    })
  },
  validateBaseFields(requireRoomCode = false) {
    if (!this.data.playerName) {
      wx.showToast({
        title: this.data.text.room.needName,
        icon: 'none'
      })
      return false
    }
    if (!this.data.serverUrl) {
      wx.showToast({
        title: this.data.text.room.needServer,
        icon: 'none'
      })
      return false
    }
    if (requireRoomCode && !this.data.roomCodeInput) {
      wx.showToast({
        title: this.data.text.room.needRoomCode,
        icon: 'none'
      })
      return false
    }
    return true
  },
  ensureConnection() {
    setServerUrl(this.data.serverUrl)
    return connect(this.data.serverUrl)
  },
  createRoom() {
    if (!this.validateBaseFields()) {
      return
    }
    this.ensureConnection()
      .then(() => request('room:create', {
        playerName: this.data.playerName
      }))
      .then((response) => {
        const session = {
          roomId: response.roomId,
          playerId: response.playerId,
          playerName: this.data.playerName
        }
        setRoomSession(session)
        this.setData({
          room: response.room,
          roomCodeInput: response.roomId,
          playerId: response.playerId,
          isHost: !!(response.room && response.room.hostPlayerId === response.playerId)
        })
      })
      .catch((error) => {
        wx.showToast({
          title: error.message || 'CREATE_FAILED',
          icon: 'none'
        })
      })
  },
  joinRoom() {
    if (!this.validateBaseFields(true)) {
      return
    }
    this.ensureConnection()
      .then(() => request('room:join', {
        roomId: this.data.roomCodeInput,
        playerName: this.data.playerName
      }))
      .then((response) => {
        const session = {
          roomId: response.roomId,
          playerId: response.playerId,
          playerName: this.data.playerName
        }
        setRoomSession(session)
        this.setData({
          room: response.room,
          playerId: response.playerId,
          isHost: !!(response.room && response.room.hostPlayerId === response.playerId)
        })
      })
      .catch((error) => {
        wx.showToast({
          title: error.message || 'JOIN_FAILED',
          icon: 'none'
        })
      })
  },
  syncRoom() {
    const session = getRoomSession()
    if (!session.roomId) {
      return
    }
    this.ensureConnection()
      .then(() => request('room:sync', {
        roomId: session.roomId,
        playerId: session.playerId
      }))
      .then((response) => {
        this.setData({
          room: response.room,
          roomCodeInput: response.room.id,
          playerId: response.playerId || session.playerId,
          isHost: !!(response.room && response.room.hostPlayerId === (response.playerId || session.playerId))
        })
        if (response.room && response.room.status !== 'lobby') {
          this.enterBattle()
        }
      })
      .catch(() => {})
  },
  startGame() {
    const session = getRoomSession()
    if (!session.roomId || !session.playerId) {
      return
    }
    this.ensureConnection()
      .then(() => request('game:start', {
        roomId: session.roomId,
        playerId: session.playerId
      }))
      .catch((error) => {
        wx.showToast({
          title: error.message || 'START_FAILED',
          icon: 'none'
        })
      })
  },
  goBattle() {
    this.enterBattle()
  },
  enterBattle() {
    if (this.data.enteredBattle) {
      return
    }
    const session = getRoomSession()
    if (!session.roomId) {
      return
    }
    this.setData({ enteredBattle: true })
    wx.navigateTo({
      url: `/pages/online-balloon/index?roomId=${session.roomId}`,
      complete: () => {
        this.setData({ enteredBattle: false })
      }
    })
  }
})
