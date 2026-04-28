const fs = require('fs')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const jsonPath = path.join(rootDir, 'data', 'punishments.json')
const jsPath = path.join(rootDir, 'data', 'punishments.js')

function toModuleSource(data) {
  return `module.exports = ${JSON.stringify(data, null, 2)}\n`
}

function writeJson(data) {
  fs.writeFileSync(jsonPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function writeJs(data) {
  fs.writeFileSync(jsPath, toModuleSource(data), 'utf8')
}

function loadFromJson() {
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
}

function loadFromJs() {
  delete require.cache[jsPath]
  return require(jsPath)
}

function validate(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Punishment data must be an object.')
  }

  Object.keys(data).forEach((level) => {
    if (!Array.isArray(data[level])) {
      throw new Error(`Level "${level}" must be an array.`)
    }

    data[level].forEach((item, index) => {
      if (!item.type || !item.en || !item.zh) {
        throw new Error(`Invalid item at ${level}[${index}]: missing type/en/zh.`)
      }
      if (!Number.isInteger(Number(item.star))) {
        throw new Error(`Invalid item at ${level}[${index}]: star must be an integer.`)
      }
    })
  })
}

function main() {
  const mode = process.argv[2]

  if (mode === '--from-js') {
    const data = loadFromJs()
    validate(data)
    writeJson(data)
    console.log('Synced punishments.js -> punishments.json')
    return
  }

  const data = loadFromJson()
  validate(data)
  writeJs(data)
  console.log('Synced punishments.json -> punishments.js')
}

main()
