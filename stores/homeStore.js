import { action, observable, computed } from 'mobx'
import PropTypes from 'prop-types'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import Api from '../api/api'

let store = null

let isServer = typeof window === 'undefined'

class HomeStore {
  constructor() {
    this.popular = []
  }

  @action async fetchJson() {
    const json = await Api.home.getGeoJson();
    this.setJsons(json)
  }

  @action fetchPopular = async () => {
    const popularExp = await Api.home.getPopularExpeditions();
    this.popular = popularExp.data
    return popularExp.data
  }

  @action setJsons = newGeoJson => {
    const { data } = newGeoJson
    this.geoJson.splice(0)
    this.geoJson.push(data)
  }

  @computed get popularAll() {
    return this.popular;
  }

  @computed get popularAir() {
    return this.filterbyTag('air')
  }

  @computed get popularLand() {
    return this.filterbyTag('land')
  }

  @computed get popularSea() {
    return this.filterbyTag('sea')
  }

  @computed get popularUrban() {
    return this.filterbyTag('urban')
  }

  @computed get popularBackyard() {
    return this.filterbyTag('backyard')
  }

  filterbyTag(tag) {
    return this.popular.filter(exp => exp.tags.includes(tag))
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
