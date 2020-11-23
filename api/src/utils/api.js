import config from 'config'
import axios from 'axios'
import { csvToArrayJson } from './csv'
import {readFile, readFileSync} from 'fs'

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
    readFile(__dirname + '/../assets/datas/cities-tension.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  }).then(list => (list.map(c => ({...c, bassin_id: c.bassin}))))
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
  let rawdata = readFileSync(__dirname + '/../assets/datas/france-shape.geo.json')
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