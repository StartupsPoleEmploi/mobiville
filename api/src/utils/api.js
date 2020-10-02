import config from 'config'
import axios from 'axios'
import csv from 'csv-parser'

export function getAllCities() {
  return axios.get(config.API_CITIES)
    .then(result => (result.data))
    .then(csv())
}

export function getAllCitiesWithLittoral() {
  return axios.get(config.API_LOI_LITTORAL)
    .then(result => (result.data))
}