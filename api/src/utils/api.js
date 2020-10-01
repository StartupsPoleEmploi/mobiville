import config from 'config'
import axios from 'axios'

export function getAllCities() {
  return axios.get(config.API_CITIES)
    .then(result => (result.data))
}