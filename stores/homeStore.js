import { action, observable, computed } from 'mobx'
import PropTypes from 'prop-types'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import Api from '../api/api'
import HomeCache from './cache'

let store = null

let isServer = typeof window === 'undefined'

class HomeStore {
  constructor() {
    this.cachedHome = new HomeCache()
  }

  @action async fetchFeaturedExpedition() {
    const response = await Api.home.getFeaturedExpedition()
    return response.data
  }

  @action async fetchJson() {
    const { data } = await Api.home.getGeoJson()
    return data
  }

  @action fetcheFilter = async (type, tag, limit) => {
    if(this.cachedHome.hasExpeditions(type, tag)) {
      console.log('asdasd')
      return this.cachedHome.getExpeditions(type, tag)
    } else {
      const popularExp = await Api.home.getExpeditionsByTypeAndTag(type, tag, limit);
      const data = popularExp.data.expeditions;
      this.cachedHome.addExpeditions(type, tag, data)
      return data
    }
    return []
  }
}

function initHomeStore() {
  if (isServer) {
    return new HomeStore()
  } else {
    if (store === null) {
      store = new HomeStore()
    }
    return store
  }
}

export {
  initHomeStore,
}
