const TYPE = {
  popular: 'popular',
  recent: 'recent',
}

const BASE = {
  all: [],
  air: [],
  land: [],
  sea: [],
  urban: [],
  backyard: [],
}

class HomeCache {
  popular = Object.assign({}, BASE)
  created = Object.assign({}, BASE)

  hasExpeditions(type, tag) {
    const obj = this[type][tag]
    return obj.length > 0;
  }

  getExpeditions(type, tag) {
    return this[type][tag]
  }

  addExpeditions(type, tag, data) {
    this[type][tag] = data
  }
}

export default HomeCache
