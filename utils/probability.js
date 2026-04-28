const LEVEL_RULES = [
  {
    level: 'UR',
    weight: 2,
    title: 'Golden Pass',
    effect: 'You are safe this round and may choose another player to take the punishment.',
    className: 'ur'
  },
  {
    level: 'SSR',
    weight: 8,
    title: 'Double Trouble',
    effect: 'You may drag one more player into the challenge with you.',
    className: 'ssr'
  },
  {
    level: 'SR',
    weight: 20,
    title: 'Mirror Shield',
    effect: 'You may redirect the question or force everyone to answer once.',
    className: 'sr'
  },
  {
    level: 'N',
    weight: 70,
    title: 'Normal Punishment',
    effect: 'No escape. Take the question directly.',
    className: 'n'
  }
]

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateThreshold() {
  return randomInt(5, 15)
}

function drawBlindBox() {
  const total = LEVEL_RULES.reduce((sum, item) => sum + item.weight, 0)
  let roll = Math.random() * total

  for (let i = 0; i < LEVEL_RULES.length; i += 1) {
    roll -= LEVEL_RULES[i].weight
    if (roll <= 0) {
      return {
        ...LEVEL_RULES[i]
      }
    }
  }

  return {
    ...LEVEL_RULES[LEVEL_RULES.length - 1]
  }
}

module.exports = {
  LEVEL_RULES,
  generateThreshold,
  drawBlindBox
}
