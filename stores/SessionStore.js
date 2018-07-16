/* eslint-disable no-undef */
import { action, observable } from 'mobx'

const isDev = process.env.NODE_ENV !== 'production'
let store = null
const isServer = typeof window === 'undefined'

class SessionStore {
  @observable user = {}
  @observable sessionId = ''

  @action
  interceptMMDBSession(env) {
    const useStaging = env !== 'production' && isDev
    const MMDBSessionURL =
      `mmdb${useStaging ? '-staging' : ''}.nationalgeographic.com/api/v1/session/?format=json`
    const MMDBLogOutURL =
      `https://mmdb${useStaging ? '-staging' : ''}.nationalgeographic.com/api/v1/auth/logout/`
    if (!isServer) {
      const { send } = XMLHttpRequest.prototype
      const self = this
      function intercept() {
        if (
          this.responseURL.includes(MMDBSessionURL) &&
          this.readyState === 4
        ) {
          const JSONResponse = JSON.parse(this.response)
          if (self.sessionId !== JSONResponse.session_id) {
            self.user = JSONResponse.user
            self.sessionId = JSONResponse.session_id
          }
        } else if (
          this.responseURL.includes(MMDBLogOutURL) &&
          this.readyState === 4
        ) {
          self.user = {}
          self.sessionId = ''
        }
      }
      XMLHttpRequest.prototype.send = function _send(...args) {
        this.addEventListener('readystatechange', intercept, false)
        send.apply(this, args)
      }
    }
  }
}

function initSessionStore(env) {
  if (isServer) {
    // return a dummy session
    return { user: null, sessionId: '' }
  } else {
    if (store === null) {
      store = new SessionStore()
      store.interceptMMDBSession(env)
    }
    return store
  }
}

export { initSessionStore }
