const BASE_PUNISHMENT_BANK = require('../data/punishments')

const STORAGE_KEY = 'punishmentBank'
const LEVELS = ['N', 'SR', 'SSR', 'UR']
const DEFAULT_THEME = 'classic'
const DEFAULT_TYPE = 'Truth'
const DEFAULT_LANG = {
  en: '',
  zh: ''
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function canUseStorage() {
  return typeof wx !== 'undefined' && wx && typeof wx.getStorageSync === 'function'
}

function normalizeItem(item, level, fallbackId) {
  return {
    id: item.id || fallbackId,
    type: item.type || DEFAULT_TYPE,
    theme: item.theme || DEFAULT_THEME,
    star: Number(item.star) || 1,
    en: item.en || DEFAULT_LANG.en,
    zh: item.zh || DEFAULT_LANG.zh,
    sourceLevel: item.sourceLevel || level
  }
}

function normalizeBank(bank) {
  return LEVELS.reduce((result, level) => {
    const list = Array.isArray(bank[level]) ? bank[level] : []
    result[level] = list.map((item, index) => normalizeItem(item, level, `${level}-${index + 1}`))
    return result
  }, {})
}

function getDefaultPunishmentBank() {
  return normalizeBank(clone(BASE_PUNISHMENT_BANK))
}

function getPunishmentBank() {
  if (!canUseStorage()) {
    return getDefaultPunishmentBank()
  }

  const savedBank = wx.getStorageSync(STORAGE_KEY)
  if (!savedBank || typeof savedBank !== 'object') {
    return getDefaultPunishmentBank()
  }

  return normalizeBank(savedBank)
}

function savePunishmentBank(bank) {
  const normalized = normalizeBank(bank)

  if (canUseStorage()) {
    wx.setStorageSync(STORAGE_KEY, normalized)
  }

  return normalized
}

function resetPunishmentBank() {
  const defaults = getDefaultPunishmentBank()
  if (canUseStorage()) {
    wx.setStorageSync(STORAGE_KEY, defaults)
  }
  return defaults
}

function createEmptyPunishment(level = 'N') {
  return normalizeItem({
    id: `${level}-${Date.now()}`,
    type: DEFAULT_TYPE,
    theme: DEFAULT_THEME,
    star: 1,
    en: '',
    zh: ''
  }, level, `${level}-${Date.now()}`)
}

module.exports = {
  LEVELS,
  STORAGE_KEY,
  createEmptyPunishment,
  getDefaultPunishmentBank,
  getPunishmentBank,
  resetPunishmentBank,
  savePunishmentBank
}
