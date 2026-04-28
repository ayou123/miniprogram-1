const punishmentBank = require('../../../data/punishments')

const LEVEL_RULES = [
  {
    level: 'UR',
    weight: 2,
    title: 'Golden Pass',
    className: 'ur'
  },
  {
    level: 'SSR',
    weight: 8,
    title: 'Double Trouble',
    className: 'ssr'
  },
  {
    level: 'SR',
    weight: 20,
    title: 'Mirror Shield',
    className: 'sr'
  },
  {
    level: 'N',
    weight: 70,
    title: 'Normal Punishment',
    className: 'n'
  }
]

const EFFECTS = {
  UR: 'The drawer is exempt and must appoint one substitute player to take the punishment.',
  SSR: 'The drawer chooses one additional player to do the punishment together.',
  SR: 'The drawer may redirect the punishment to another player.',
  N: 'The drawer executes the punishment directly.'
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateThreshold() {
  return randomInt(5, 15)
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

function normalizePunishment(item, level) {
  return {
    ...item,
    sourceLevel: item.sourceLevel || level
  }
}

function getPlayablePunishments() {
  return Object.keys(punishmentBank).reduce((list, level) => {
    const entries = (punishmentBank[level] || [])
      .map((item) => normalizePunishment(item, level))
      .filter((item) => item.type !== 'Privilege')
    return list.concat(entries)
  }, [])
}

function drawBlindBox() {
  const total = LEVEL_RULES.reduce((sum, item) => sum + item.weight, 0)
  let roll = Math.random() * total

  for (let i = 0; i < LEVEL_RULES.length; i += 1) {
    roll -= LEVEL_RULES[i].weight
    if (roll <= 0) {
      return {
        ...LEVEL_RULES[i],
        effect: EFFECTS[LEVEL_RULES[i].level]
      }
    }
  }

  const fallback = LEVEL_RULES[LEVEL_RULES.length - 1]
  return {
    ...fallback,
    effect: EFFECTS[fallback.level]
  }
}

function pickQuestion(clickCount, level) {
  const targetStar = getStarByClickCount(clickCount)
  const playablePunishments = getPlayablePunishments()
  const exactMatches = playablePunishments.filter((item) => Number(item.star) === targetStar)
  const fallbackMatches = playablePunishments.filter((item) => Number(item.star) <= targetStar)
  const levelMatches = (punishmentBank[level] || [])
    .map((item) => normalizePunishment(item, level))
    .filter((item) => item.type !== 'Privilege' && Number(item.star) <= targetStar)
  const normalMatches = (punishmentBank.N || [])
    .map((item) => normalizePunishment(item, 'N'))
    .filter((item) => item.type !== 'Privilege')
  const candidateList = exactMatches.length
    ? exactMatches
    : fallbackMatches.length
      ? fallbackMatches
      : levelMatches.length
        ? levelMatches
        : normalMatches

  const index = Math.floor(Math.random() * candidateList.length)
  return {
    ...candidateList[index],
    targetStar
  }
}

function createRound() {
  return {
    clickCount: 0,
    threshold: generateThreshold(),
    status: 'playing',
    loserPlayerId: '',
    result: null,
    question: null,
    resolution: null
  }
}

module.exports = {
  createRound,
  drawBlindBox,
  generateThreshold,
  getStarByClickCount,
  pickQuestion
}
