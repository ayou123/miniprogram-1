const { getServerUrl } = require('./online-session')

let socketTask = null
let currentUrl = ''
let ackSeed = 0
let connectingPromise = null
const eventListeners = {}
const pendingAcks = {}

function emitLocal(event, payload) {
  const list = eventListeners[event] || []
  list.forEach((handler) => {
    try {
      handler(payload)
    } catch (error) {
      console.log('realtime handler error', error)
    }
  })
}

function ensureSocketHandlers() {
  if (!socketTask) {
    return
  }

  socketTask.onClose(() => {
    Object.keys(pendingAcks).forEach((ackId) => {
      pendingAcks[ackId].reject(new Error('SOCKET_CLOSED'))
      delete pendingAcks[ackId]
    })
    socketTask = null
    connectingPromise = null
    emitLocal('socket:close', {})
  })

  socketTask.onError((error) => {
    emitLocal('socket:error', error)
  })

  socketTask.onMessage((message) => {
    try {
      const data = JSON.parse(message.data)
      if (data.event === 'ack' && data.ackId && pendingAcks[data.ackId]) {
        pendingAcks[data.ackId].resolve(data.payload || {})
        delete pendingAcks[data.ackId]
        return
      }
      emitLocal(data.event, data.payload || {})
    } catch (error) {
      console.log('realtime parse error', error)
    }
  })
}

function connect(url = getServerUrl()) {
  console.log('realtime connect url =', url)

  if (socketTask && currentUrl === url) {
    return Promise.resolve(socketTask)
  }

  if (connectingPromise && currentUrl === url) {
    return connectingPromise
  }

  if (socketTask && currentUrl && currentUrl !== url) {
    try {
      socketTask.close()
    } catch (error) {
      console.log('close previous socket failed', error)
    }
    socketTask = null
    connectingPromise = null
  }

  currentUrl = url
  connectingPromise = new Promise((resolve, reject) => {
    let settled = false
    socketTask = wx.connectSocket({
      url
    })

    socketTask.onOpen(() => {
      if (settled) {
        return
      }
      settled = true
      ensureSocketHandlers()
      emitLocal('socket:open', {})
      resolve(socketTask)
    })

    socketTask.onError((error) => {
      if (settled) {
        emitLocal('socket:error', error)
        return
      }
      settled = true
      socketTask = null
      connectingPromise = null
      reject(error)
    })
  })

  return connectingPromise
}

function close() {
  if (socketTask) {
    socketTask.close()
  }
  socketTask = null
  connectingPromise = null
}

function request(event, payload = {}) {
  return connect().then(() => new Promise((resolve, reject) => {
    const ackId = `ack_${Date.now()}_${ackSeed += 1}`
    pendingAcks[ackId] = {
      resolve: (response) => {
        if (response.ok) {
          resolve(response)
          return
        }
        reject(new Error(response.message || 'REQUEST_FAILED'))
      },
      reject
    }

    if (!socketTask) {
      delete pendingAcks[ackId]
      reject(new Error('SOCKET_NOT_CONNECTED'))
      return
    }

    try {
      socketTask.send({
        data: JSON.stringify({
          event,
          ackId,
          payload
        })
      })
    } catch (error) {
      delete pendingAcks[ackId]
      reject(error)
    }
  }))
}

function isConnected() {
  return !!socketTask
}

module.exports = {
  close,
  connect,
  isConnected,
  request,
  subscribe
}

function subscribe(event, handler) {
  if (!eventListeners[event]) {
    eventListeners[event] = []
  }
  eventListeners[event].push(handler)
  return () => {
    eventListeners[event] = (eventListeners[event] || []).filter((item) => item !== handler)
  }
}
