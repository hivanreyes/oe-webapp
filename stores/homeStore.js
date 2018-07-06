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

  @action async fetchFeaturedExpedition() {
    const response = await Api.home.getFeaturedExpedition()
    return response.data

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

  }

  @computed get popularAll() {
    return this.popular;
  }

  @computed get popularAir() {
    let airFiltered = this.filterbyTag('air')
    return airFiltered
  }

  @computed get popularLand() {
    let airFiltered = this.filterbyTag('land')
    return airFiltered
  }

  @computed get popularSea() {
    let airFiltered = this.filterbyTag('sea')
    return airFiltered
  }

  @computed get popularUrban() {
    let airFiltered = this.filterbyTag('urban')
    return airFiltered
  }

  @computed get popularBackyard() {
    let airFiltered = this.filterbyTag('backyard')
    return airFiltered
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
