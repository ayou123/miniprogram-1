const { getLanguage, t } = require('../../utils/i18n')

Page({
  data: {
    playerName: 'Anonymous',
    lang: 'en',
    text: {},
    clickCount: 0,
    result: {},
    question: {},
    summary: ''
  },
  onLoad(options) {
    const lang = getLanguage()
    const text = t(lang)
    const latestBattle = wx.getStorageSync('latestBattle') || {}
    wx.setNavigationBarTitle({
      title: text.result.nav
    })
    const playerName = decodeURIComponent(options.playerName || latestBattle.playerName || text.balloon.anonymous)
    const clickCount = Number(options.clickCount || latestBattle.clickCount || 0)
    const result = latestBattle.result && latestBattle.result.level ? latestBattle.result : {
      level: options.level || 'N',
      title: decodeURIComponent(options.title || text.rewards.N.title),
      className: ((options.level || 'N') || 'N').toLowerCase()
    }
    const question = latestBattle.question && latestBattle.question.content ? latestBattle.question : {
      type: text.result.missingQuestionType,
      content: text.result.missingQuestion
    }

    this.setData({
      lang,
      text,
      playerName,
      clickCount,
      result,
      question,
      summary: text.result.summary(clickCount, result.level, result.title)
    })
  },
  playAgain() {
    wx.redirectTo({
      url: `/pages/balloon/index?playerName=${encodeURIComponent(this.data.playerName)}`
    })
  },
  goHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  onShareAppMessage() {
    return {
      title: this.data.text.result.shareTitle(this.data.playerName, this.data.clickCount, this.data.result.level),
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
