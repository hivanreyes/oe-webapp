/* eslint-disable no-undef */
import { action, observable } from 'mobx'

// id	16990690
// username	hermes.espinola@gmail.com
// address	null
// city	Zapopan
// state	Jalisco
// country	Mexico
// email	hermes.espinola@gmail.com
// first_name	Hermes
// middle_name	null
// last_name	Espinola
// birth_year	null
// birth_month	null
// birth_day	null
// gender	null
// is_banned	false
// tz_name	America/Mexico_City
// display_name	Hermes Espinola
// display_name_style	first_last
// is_yourshot	false
// display_location	Zapopan, Jalisco, Mexico
// display_location_style	l3
// zipcode	null
// bio	null
// vanity_url	190870281734
// date_joined	2018-03-29T20:39:20.656
// follow_website	null
// follow_facebook	null
// follow_twitter	null
// follow_google_plus	null
// follow_tumblr	null
// follow_instagram	null
// location	{…}
// facebook_avatar	null
// uploaded_avatar	null
// custom_avatar	{…}
// social_avatar	{…}
// avatar_in_use	null
// noindex	false
// is_staff	false
// is_expert	false
// expert_title	null
// livefyre_token	eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJkaXNwbGF5X25hbWUiOiAiSGVybWVzIEVzcGlub2xhIiwgImRvbWFpbiI6ICJuYXRnZW8uZnlyZS5jbyIsICJleHBpcmVzIjogMTUzMzk1NTU4NC4wNzMyMTcsICJ1c2VyX2lkIjogMTY5OTA2OTB9._WZLzzWIygrzqIfCqYTg9GbCHVcSmDT6RpKZsx70HHM
// pending_email	null
// member_since_date	2018-03-29T20:39:20.959
// reg_url	https://openexplorer.nationalgeographic.com/home
//   reg_type	02
// is_active	true
// public_profile_url	https://members.nationalgeographic.com/190870281734/
//   lucie_subscription_type	R
// educator	null
// subscriptions	[]

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
            console.log(self.sessionId)
          }
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
