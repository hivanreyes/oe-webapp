import axios from 'axios'

const API_HOST = 'http://openexplorer-dev.nationalgeographic.com:8081/api/'

function api() {
  return axios.create({
    baseURL: API_HOST,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
    },
  })
}

export default {
  home: {
    getPopularExpeditions: () =>
      api().get('views/expeditions/popular/20'),
    getLatestExpeditions: () =>
      api().get('views/expeditions/recent/20'),
    getFeaturedExpedition: () =>
      api().get('/views/expeditions/featured'),
    getObservations: () =>
      api().get('/views/observations/recent/20'),
    getGeoJson: () =>
      api().get('/views/expeditions/geojson'),
  },
  expedition: {
    checkFollow: subdomain => api().get(`/expedition/${subdomain}/checkfollow`, { withCredentials: true }),
    follow: subdomain => api().post(`/expedition/${subdomain}/follow`, { withCredentials: true }),
    unfollow: subdomain => api().delete(`/expedition/${subdomain}/unfollow`, { withCredentials: true }),
  },
}
