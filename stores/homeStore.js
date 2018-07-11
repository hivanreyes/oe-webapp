import { action, observable } from 'mobx'
import PropTypes from 'prop-types'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import Api from '../api/api'

let store = null

let isServer = typeof window === 'undefined'

class HomeStore {

  @observable geoJson = []

  @action async fetchJson() {
    const json = await Api.home.getGeoJson();
    this.setJsons(json)
  }

  @action async fetchFeaturedExpedition() {
    const response = await Api.home.getFeaturedExpedition()
    return response.data
  }

  @action setJsons = newGeoJson => {
    const { data } = newGeoJson
    this.geoJson.splice(0)
    this.geoJson.push(data)
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
