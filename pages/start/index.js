const { getLanguage, t } = require('../../utils/i18n')

Page({
  data: {
    lang: 'en',
    text: {},
    playerName: '',
    cardList: []
  },
  onLoad(options) {
    this.applyLanguage(options.playerName ? decodeURIComponent(options.playerName) : '')
  },
  onShow() {
    if (this.data.text.start) {
      this.applyLanguage()
    }
  },
  applyLanguage(playerName = wx.getStorageSync('playerName') || this.data.playerName) {
    const lang = getLanguage()
    const text = t(lang)
    wx.setNavigationBarTitle({
      title: text.start.nav
    })
    this.setData({
      lang,
      text,
      playerName: playerName || text.balloon.anonymous,
      cardList: ['N', 'SR', 'SSR', 'UR'].map((level) => ({
        level,
        className: level.toLowerCase(),
        ...text.start.cards[level]
      }))
    })
  },
  startGame() {
    wx.navigateTo({
      url: `/pages/balloon/index?playerName=${encodeURIComponent(this.data.playerName)}`
    })
  },
  openMultiplayer() {
    wx.navigateTo({
      url: '/pages/room/index'
    })
  },
  openLibrary() {
    wx.navigateTo({
      url: '/pages/punishments/index'
    })
  },
  backHome() {
    wx.navigateBack({
      delta: 1
    })
  }
})
