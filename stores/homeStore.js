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

  @action async fetchJson() {
    const { data } = await Api.home.getGeoJson()
    return data
  }

  @action fetchPopular = async () => {
    const popularExp = await Api.home.getPopularExpeditions();
    this.popular = popularExp.data
    return popularExp.data
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

  @action fetchRecent = async () => {
    const recentExp = await Api.home.getLatestExpeditions();
    this.recent = recentExp.data
    return recentExp.data
  }

  @computed get recentAll() {
    return this.popular;
  }

  @computed get recentAir() {
    return this.filterbyTag('air', 'recent')
  }

  @computed get recentLand() {
    return this.filterbyTag('land', 'recent')
  }

  @computed get recentSea() {
    return this.filterbyTag('sea', 'recent')
  }

  @computed get recentUrban() {
    return this.filterbyTag('urban', 'recent')
  }

  @computed get recentBackyard() {
    return this.filterbyTag('backyard', 'recent')
  }

  filterbyTag(tag, type= 'popular') {
    if(type === 'popular') {
      return this.popular.filter(exp => exp.tags.includes(tag))
    }

    if(type === 'recent') {
      return this.recent.filter(exp => exp.tags.includes(tag))
    }
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
