const { getLanguage, t } = require('../../utils/i18n')
const {
  LEVELS,
  createEmptyPunishment,
  getPunishmentBank,
  resetPunishmentBank,
  savePunishmentBank
} = require('../../utils/punishment-store')

const TYPE_VALUES = ['Truth', 'Dare', 'Privilege']
const THEME_VALUES = ['classic', 'friends', 'party', 'couple', 'work']

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

Page({
  data: {
    lang: 'en',
    text: {},
    activeLevel: 'N',
    levelOptions: LEVELS,
    typeValues: TYPE_VALUES,
    themeValues: THEME_VALUES,
    typeLabels: [],
    themeLabels: [],
    bank: {},
    currentEntries: [],
    form: createEmptyPunishment('N'),
    editingId: '',
    typeIndex: 0,
    themeIndex: 0
  },
  onLoad() {
    this.applyLanguage()
    this.loadBank()
    this.syncFormMeta(this.data.form)
  },
  onShow() {
    this.applyLanguage()
    this.loadBank()
  },
  applyLanguage() {
    const lang = getLanguage()
    const text = t(lang)
    wx.setNavigationBarTitle({
      title: text.library.nav
    })
    this.setData({
      lang,
      text,
      typeLabels: TYPE_VALUES.map((item) => text.library.typeOptions[item]),
      themeLabels: THEME_VALUES.map((item) => text.library.themeOptions[item])
    })
  },
  loadBank() {
    const bank = getPunishmentBank()
    this.setData({
      bank
    })
    this.syncCurrentEntries(this.data.activeLevel, bank)
  },
  syncCurrentEntries(level = this.data.activeLevel, bank = this.data.bank) {
    this.setData({
      currentEntries: bank[level] || []
    })
  },
  syncFormMeta(form = this.data.form) {
    this.setData({
      typeIndex: Math.max(0, TYPE_VALUES.indexOf(form.type)),
      themeIndex: Math.max(0, THEME_VALUES.indexOf(form.theme))
    })
  },
  switchLevel(e) {
    const { level } = e.currentTarget.dataset
    const nextForm = createEmptyPunishment(level)
    nextForm.star = this.data.form.star
    this.setData({
      activeLevel: level,
      editingId: '',
      form: nextForm
    })
    this.syncFormMeta(nextForm)
    this.syncCurrentEntries(level, this.data.bank)
  },
  onTypeChange(e) {
    const typeIndex = Number(e.detail.value)
    this.setData({
      'form.type': TYPE_VALUES[typeIndex],
      typeIndex
    })
  },
  onThemeChange(e) {
    const themeIndex = Number(e.detail.value)
    this.setData({
      'form.theme': THEME_VALUES[themeIndex],
      themeIndex
    })
  },
  onStarChange(e) {
    const star = Math.max(1, Math.min(5, Number(e.detail.value) || 1))
    this.setData({
      'form.star': star
    })
  },
  onTextInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`form.${field}`]: e.detail.value
    })
  },
  createNew() {
    const form = createEmptyPunishment(this.data.activeLevel)
    this.setData({
      editingId: '',
      form
    })
    this.syncFormMeta(form)
  },
  editEntry(e) {
    const { id } = e.currentTarget.dataset
    const current = (this.data.bank[this.data.activeLevel] || []).find((item) => item.id === id)
    if (!current) {
      return
    }
    this.setData({
      editingId: id,
      form: clone(current)
    })
    this.syncFormMeta(current)
  },
  cancelEdit() {
    this.createNew()
  },
  saveEntry() {
    const form = {
      ...this.data.form,
      en: (this.data.form.en || '').trim(),
      zh: (this.data.form.zh || '').trim(),
      star: Math.max(1, Math.min(5, Number(this.data.form.star) || 1))
    }

    if (!form.en || !form.zh) {
      wx.showToast({
        title: this.data.text.library.validation,
        icon: 'none'
      })
      return
    }

    const bank = clone(this.data.bank)
    const list = Array.isArray(bank[this.data.activeLevel]) ? bank[this.data.activeLevel] : []
    const nextList = this.data.editingId
      ? list.map((item) => (item.id === this.data.editingId ? form : item))
      : list.concat({
        ...form,
        id: form.id || `${this.data.activeLevel}-${Date.now()}`
      })

    bank[this.data.activeLevel] = nextList
    savePunishmentBank(bank)
    const nextBank = getPunishmentBank()
    const nextForm = createEmptyPunishment(this.data.activeLevel)
    this.setData({
      bank: nextBank,
      editingId: '',
      form: nextForm
    })
    this.syncCurrentEntries(this.data.activeLevel, nextBank)
    this.syncFormMeta(nextForm)
    wx.showToast({
      title: this.data.text.library.saved,
      icon: 'success'
    })
  },
  removeEntry(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: this.data.text.library.remove,
      content: this.data.text.library.confirmRemove,
      success: (res) => {
        if (!res.confirm) {
          return
        }
        const bank = clone(this.data.bank)
        bank[this.data.activeLevel] = (bank[this.data.activeLevel] || []).filter((item) => item.id !== id)
        savePunishmentBank(bank)
        const nextBank = getPunishmentBank()
        this.setData({
          bank: nextBank
        })
        this.syncCurrentEntries(this.data.activeLevel, nextBank)
        if (this.data.editingId === id) {
          this.createNew()
        }
        wx.showToast({
          title: this.data.text.library.deleted,
          icon: 'success'
        })
      }
    })
  },
  resetBank() {
    wx.showModal({
      title: this.data.text.library.reset,
      content: this.data.text.library.reset,
      success: (res) => {
        if (!res.confirm) {
          return
        }
        resetPunishmentBank()
        const nextBank = getPunishmentBank()
        const nextForm = createEmptyPunishment(this.data.activeLevel)
        this.setData({
          bank: nextBank,
          editingId: '',
          form: nextForm
        })
        this.syncCurrentEntries(this.data.activeLevel, nextBank)
        this.syncFormMeta(nextForm)
        wx.showToast({
          title: this.data.text.library.resetDone,
          icon: 'success'
        })
      }
    })
  }
})
