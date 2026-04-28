const SERVER_URL_KEY = 'onlineServerUrl'
const ROOM_SESSION_KEY = 'onlineRoomSession'

function getDefaultServerUrl() {
  // return 'ws://127.0.0.1:3001/ws'
  return 'ws://10.145.65.140:3001/ws'
}

function getServerUrl() {
  return wx.getStorageSync(SERVER_URL_KEY) || getDefaultServerUrl()
}

function setServerUrl(url) {
  wx.setStorageSync(SERVER_URL_KEY, url)
}

function getRoomSession() {
  return wx.getStorageSync(ROOM_SESSION_KEY) || {}
}

function setRoomSession(session) {
  wx.setStorageSync(ROOM_SESSION_KEY, session || {})
}

function clearRoomSession() {
  wx.removeStorageSync(ROOM_SESSION_KEY)
}

module.exports = {
  ROOM_SESSION_KEY,
  SERVER_URL_KEY,
  clearRoomSession,
  getDefaultServerUrl,
  getRoomSession,
  getServerUrl,
  setRoomSession,
  setServerUrl
}
