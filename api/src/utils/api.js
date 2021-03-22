import config from 'config'
import axios from 'axios'
import { csvToArrayJson } from './csv'
import {readFile, readFileSync} from 'fs'
import slugify from 'slugify'
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
import stripHtml from 'string-strip-html'

export function getAllCities() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/cities-france.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  })
}

export function getAllTensions() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/cities-tension-utf8.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  }).then(list => (list.map(c => ({
    ...c, 
    bassin_id: c.cbassin, 
    bassin_lib: c.lib_bassin_bmo19, 
    defm: 0, 
    dee: null, 
    oee_nosais: null, 
    ind_t: c.ind_tension_d,
  }))))
}

export function getAllBassins() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/lexique-bassins.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data, {delimiter: ','}))
      }
    })
  }).then(list => (list.map(c => ({...c, code_commune: c.ccommune, nom_com: c.nomcom, bassin_id: c.be19, bassin_name: c.nombre19}))))
}

export function getFranceShape() {
  let rawdata = readFileSync(__dirname + '/../assets/datas/france-shape-side-sea.geo.json')
  return JSON.parse(rawdata).features[0].geometry.coordinates.flat(2)
}

export function getFrenchWeatherStation() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/french-weather-station-list.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data, {delimiter: ','}))
      }
    })
  })
}

export function loadWeatherFile(stationId) {
  return axios.get(config.weatherFile(stationId)).then(data => data.data.split('\r\n'))
}

export const wikipediaDetails = (pageName) => axios.get(`https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts%7Cpageimages&piprop=original&exintro&explaintext&generator=search&gsrsearch=%22${pageName}%22%20+deepcat:%22Article%20avec%20mod%C3%A8le%20Infobox%20Commune%20de%20France%22&gsrlimit=1&redirects=1`).then((response) => {
  if(response.data && response.data.query && response.data.query.pages) {
    return Object.values(response.data.query.pages)[0]
  }

  return null
})

export const getAllRegions = () => {
  let rawdata = readFileSync(__dirname + '/../assets/datas/anciennes-nouvelles-regions.json')
  return JSON.parse(rawdata).regions.map(r => ({...r.fields}))
}

export function getAveragePricing() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/dvf-communes-2019.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  })
}

export const getTensionsCities = () => {
  let rawdata = readFileSync(__dirname + '/../assets/datas/donnees-de-reference_zonage-commune.json')
  return JSON.parse(rawdata).zonageCommunes
}

export function getAverageHouseRent() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/indicateurs-loyers-appartements.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  })
}

export function getAmenitiesDatas() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../datas-mnt/bpe19_ensemble_xy.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  })
}