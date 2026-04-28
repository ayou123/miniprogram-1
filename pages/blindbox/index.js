const { drawBlindBox } = require('../../utils/probability')
const { pickQuestion } = require('../../utils/questions')
const { getLanguage, t } = require('../../utils/i18n')

function createStars(star) {
  return Array.from({ length: star }, (_, index) => index)
}

Page({
  data: {
    playerName: 'Anonymous',
    lang: 'en',
    text: {},
    clickCount: 0,
    cards: [{ id: 1 }, { id: 2 }, { id: 3 }],
    revealedCardId: null,
    result: {},
    question: {}
  },
  onLoad(options) {
    const lang = getLanguage()
    const text = t(lang)
    wx.setNavigationBarTitle({
      title: text.blindbox.nav
    })
    this.setData({
      lang,
      text,
      playerName: decodeURIComponent(options.playerName || text.balloon.anonymous),
      clickCount: Number(options.clickCount || 0)
    })
  },
  pickCard(e) {
    if (this.data.revealedCardId) {
      return
    }

    const revealedCardId = Number(e.currentTarget.dataset.id)
    const rawResult = drawBlindBox()
    const rawQuestion = pickQuestion(this.data.clickCount, rawResult.level)
    const rewardText = this.data.text.rewards[rawResult.level]
    const questionTypeKey = (rawQuestion.type || 'Truth').toLowerCase()
    const star = Number(rawQuestion.targetStar || rawQuestion.star || 1)
    const result = {
      ...rawResult,
      title: rewardText.title,
      effect: rewardText.effect
    }
    const question = {
      ...rawQuestion,
      type: this.data.text.questions[questionTypeKey] || rawQuestion.type,
      content: rawQuestion[this.data.lang] || rawQuestion.en,
      star,
      stars: createStars(star),
      sourceLevel: rawQuestion.sourceLevel || rawResult.level
    }

    this.setData({
      revealedCardId,
      result,
      question
    })

    wx.setStorageSync('latestBattle', {
      playerName: this.data.playerName,
      clickCount: this.data.clickCount,
      result,
      question,
      updatedAt: Date.now()
    })
  },
  restartGame() {
    wx.redirectTo({
      url: `/pages/balloon/index?playerName=${encodeURIComponent(this.data.playerName)}`
    })
  },
  goResult() {
    if (!this.data.revealedCardId) {
      return
    }
    wx.navigateTo({
      url: `/pages/result/index?playerName=${encodeURIComponent(this.data.playerName)}&clickCount=${this.data.clickCount}&level=${this.data.result.level}&title=${encodeURIComponent(this.data.result.title)}`
    })
  }
})
