const { getLanguage, setLanguage, t } = require('../../utils/i18n')
const { getPunishmentStats } = require('../../utils/questions')

Page({
  data: {
    playerName: '',
    lang: 'en',
    text: {},
    quickNames: [],
    ruleItems: [],
    games: [],
    stats: {
      total: 0,
      themes: [],
      stars: []
    }
  },
  onLoad() {
    const playerName = wx.getStorageSync('playerName') || ''
    const lang = getLanguage()
    this.applyLanguage(lang, playerName)
  },
  onShow() {
    if (this.data.lang) {
      this.applyLanguage(this.data.lang, wx.getStorageSync('playerName') || this.data.playerName)
    }
  },
  applyLanguage(lang, playerName = this.data.playerName) {
    const text = t(lang)
    const rawStats = getPunishmentStats()
    const themeLabelMap = {
      classic: text.home.themeClassic,
      friends: text.home.themeFriends,
      party: text.home.themeParty,
      couple: text.home.themeCouple,
      work: text.home.themeWork
    }
    wx.setNavigationBarTitle({
      title: text.home.title
    })
    this.setData({
      lang,
      text,
      playerName,
      quickNames: text.home.quickNames,
      ruleItems: text.home.rules,
      stats: {
        total: rawStats.total,
        themes: rawStats.themes.map((item) => ({
          ...item,
          label: themeLabelMap[item.key] || item.key
        })),
        stars: rawStats.stars
      },
      games: [
        {
          id: 'balloon-blindbox',
          title: text.home.gameBalloonTitle,
          desc: text.home.gameBalloonDesc,
          status: text.home.gameStatusReady,
          ready: true
        },
        {
          id: 'rhythm-duel',
          title: text.home.gameRhythmTitle,
          desc: text.home.gameRhythmDesc,
          status: text.home.gameStatusSoon,
          ready: false
        },
        {
          id: 'truth-table',
          title: text.home.gameTruthTitle,
          desc: text.home.gameTruthDesc,
          status: text.home.gameStatusSoon,
          ready: false
        }
      ]
    })
  },
  onNameInput(e) {
    this.setData({
      playerName: e.detail.value.trim()
    })
  },
  fillQuickName(e) {
    const { name } = e.currentTarget.dataset
    this.setData({ playerName: name })
  },
  ensurePlayerName() {
    const fallbackPrefix = this.data.lang === 'zh' ? '\u73a9\u5bb6' : 'Player'
    const playerName = this.data.playerName || `${fallbackPrefix}${Date.now().toString().slice(-4)}`
    wx.setStorageSync('playerName', playerName)
    this.setData({ playerName })
    return playerName
  },
  startGame() {
    const playerName = this.ensurePlayerName()
    wx.navigateTo({
      url: `/pages/start/index?playerName=${encodeURIComponent(playerName)}`
    })
  },
  openLibraryManager() {
    wx.navigateTo({
      url: '/pages/punishments/index'
    })
  },
  showRules() {
    wx.showModal({
      title: this.data.text.home.rulesTitle,
      content: this.data.ruleItems.join('\n\n'),
      showCancel: false,
      confirmText: this.data.text.home.rulesConfirm
    })
  },
  showManual(e) {
    const { manual } = e.currentTarget.dataset
    const content = manual === 'balloon'
      ? this.data.text.home.manualBalloonSummary.join('\n\n')
      : this.data.text.home.manualBlindboxSummary.join('\n\n')

    wx.showModal({
      title: this.data.text.home.manualModalTitle,
      content,
      showCancel: false,
      confirmText: this.data.text.home.rulesConfirm
    })
  },
  openGame(e) {
    const { ready } = e.currentTarget.dataset
    if (!ready) {
      wx.showToast({
        title: this.data.text.home.comingSoon,
        icon: 'none'
      })
      return
    }
    this.startGame()
  },
  toggleLanguage() {
    const nextLang = this.data.lang === 'zh' ? 'en' : 'zh'
    setLanguage(nextLang)
    this.applyLanguage(nextLang)
  }
})
