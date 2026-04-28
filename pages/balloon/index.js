const { generateThreshold } = require('../../utils/probability')
const { getLanguage, t } = require('../../utils/i18n')

Page({
  data: {
    playerName: 'Anonymous',
    lang: 'en',
    text: {},
    clickCount: 0,
    threshold: 10,
    balloonScale: 1,
    exploded: false,
    currentTaunt: '',
    hintText: '',
    dangerText: '',
    dangerClass: ''
  },
  onLoad(options) {
    const lang = getLanguage()
    const text = t(lang)
    const playerName = decodeURIComponent(options.playerName || wx.getStorageSync('playerName') || text.balloon.anonymous)
    this.heartbeatTimer = null
    this.redirectTimer = null
    this.shortVibrationCount = 0
    wx.setNavigationBarTitle({
      title: text.balloon.nav
    })
    this.setData({
      lang,
      text,
      playerName,
      threshold: generateThreshold(),
      currentTaunt: text.balloon.ready,
      hintText: text.balloon.firstHint,
      dangerText: text.balloon.low
    })
    this.syncHeartbeat()
  },
  onUnload() {
    this.clearTimers()
  },
  clearTimers() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
      this.redirectTimer = null
    }
  },
  syncHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
    }

    if (this.data.exploded) {
      return
    }

    const interval = Math.max(320, 1200 - this.data.clickCount * 80)
    this.heartbeatTimer = setInterval(() => {
      if (this.data.exploded) {
        return
      }
      this.safeVibrate(this.data.clickCount > Math.floor(this.data.threshold / 2) ? 'long' : 'short')
    }, interval)
  },
  safeVibrate(type) {
    try {
      if (type === 'long') {
        wx.vibrateLong()
      } else {
        wx.vibrateShort()
      }
    } catch (error) {
      console.log('vibrate unavailable', error)
    }
  },
  inflateBalloon() {
    if (this.data.exploded) {
      return
    }

    const clickCount = this.data.clickCount + 1
    const exploded = clickCount >= this.data.threshold
    const dangerRatio = clickCount / this.data.threshold
    const taunts = this.data.text.balloon.taunts
    const currentTaunt = taunts[Math.floor(Math.random() * taunts.length)]

    if (clickCount <= 5) {
      this.safeVibrate('short')
    } else if (clickCount > this.data.threshold / 2) {
      this.safeVibrate('long')
    } else {
      this.safeVibrate('short')
    }

    this.setData({
      clickCount,
      balloonScale: Number((1 + clickCount * 0.08).toFixed(2)),
      exploded,
      currentTaunt,
      hintText: exploded ? this.data.text.balloon.redirectHint : this.getHintText(dangerRatio),
      dangerText: dangerRatio > 0.8 ? this.data.text.balloon.critical : dangerRatio > 0.5 ? this.data.text.balloon.rising : this.data.text.balloon.low,
      dangerClass: dangerRatio > 0.8 ? 'high' : dangerRatio > 0.5 ? 'mid' : ''
    })

    this.syncHeartbeat()

    if (exploded) {
      this.handleExplosion()
    }
  },
  getHintText(dangerRatio) {
    if (dangerRatio > 0.8) {
      return this.data.text.balloon.hintHigh
    }
    if (dangerRatio > 0.5) {
      return this.data.text.balloon.hintMid
    }
    return this.data.text.balloon.hintLow
  },
  handleExplosion() {
    this.clearTimers()
    this.safeVibrate('long')
    this.redirectTimer = setTimeout(() => {
      wx.redirectTo({
        url: `/pages/blindbox/index?playerName=${encodeURIComponent(this.data.playerName)}&clickCount=${this.data.clickCount}`
      })
    }, 1500)
  },
  goHome() {
    this.clearTimers()
    wx.navigateBack({
      delta: 1
    })
  }
})
