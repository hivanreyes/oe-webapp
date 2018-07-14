import { action, observable, computed } from 'mobx'
import PropTypes from 'prop-types'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import Api from '../api/api'

let store = null

let isServer = typeof window === 'undefined'

class HomeStore {
  constructor() {
    this.popular = []
    this.recent = []
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
    const popularExp = await Api.home.getExpeditionsByTypeAndTag(type, tag, limit);
    return popularExp.data.expeditions
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
