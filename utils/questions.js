const { getPunishmentBank } = require('./punishment-store')
const DEFAULT_THEME = 'classic'
const PRIVILEGE_TYPE = 'Privilege'

function normalizePunishment(item, level) {
  return {
    ...item,
    theme: item.theme || DEFAULT_THEME,
    sourceLevel: item.sourceLevel || level
  }
}

function getStarByClickCount(clickCount) {
  if (clickCount >= 13) {
    return 5
  }
  if (clickCount >= 11) {
    return 4
  }
  if (clickCount >= 9) {
    return 3
  }
  if (clickCount >= 7) {
    return 2
  }
  return 1
}

function getAllPunishments() {
  const punishmentBank = getPunishmentBank()
  return Object.keys(punishmentBank).reduce((list, level) => {
    return list.concat(
      (punishmentBank[level] || []).map((item) => normalizePunishment(item, level))
    )
  }, [])
}

function getPlayablePunishments() {
  return getAllPunishments().filter((item) => item.type !== PRIVILEGE_TYPE)
}

function getPunishmentStats() {
  const allPunishments = getAllPunishments()
  const themeCountMap = {}
  const starCountMap = {}

  allPunishments.forEach((item) => {
    themeCountMap[item.theme] = (themeCountMap[item.theme] || 0) + 1
    const starKey = `${Number(item.star)}`
    starCountMap[starKey] = (starCountMap[starKey] || 0) + 1
  })

  return {
    total: allPunishments.length,
    themes: Object.keys(themeCountMap).map((theme) => ({
      key: theme,
      count: themeCountMap[theme]
    })),
    stars: Object.keys(starCountMap)
      .sort((a, b) => Number(a) - Number(b))
      .map((star) => ({
        star: Number(star),
        count: starCountMap[star]
      }))
  }
}

function pickQuestion(clickCount, level) {
  const punishmentBank = getPunishmentBank()
  const targetStar = getStarByClickCount(clickCount)
  const playablePunishments = getPlayablePunishments()
  const exactMatches = playablePunishments.filter((item) => Number(item.star) === targetStar)
  const fallbackMatches = playablePunishments.filter((item) => Number(item.star) <= targetStar)
  const levelMatches = (punishmentBank[level] || [])
    .map((item) => normalizePunishment(item, level))
    .filter((item) => item.type !== PRIVILEGE_TYPE && Number(item.star) <= targetStar)
  const normalMatches = (punishmentBank.N || [])
    .map((item) => normalizePunishment(item, 'N'))
    .filter((item) => item.type !== PRIVILEGE_TYPE)
  const candidateList = exactMatches.length
    ? exactMatches
    : fallbackMatches.length
      ? fallbackMatches
      : levelMatches.length
        ? levelMatches
        : normalMatches

  const index = Math.floor(Math.random() * candidateList.length)
  return {
    ...normalizePunishment(candidateList[index], level),
    targetStar
  }
}

module.exports = {
  getStarByClickCount,
  getPunishmentStats,
  pickQuestion
}
