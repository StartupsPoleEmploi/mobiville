import config from 'config'
import axios from 'axios'
import { csvToArrayJson } from './csv'
import {readFile} from 'fs'

export function getAllCities() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/correspondance-code-insee-code-postal.csv', (err, data) => {
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
    readFile(__dirname + '/../assets/datas/tension.csv', (err, data) => {
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
    readFile(__dirname + '/../assets/datas/Bassin_BMO19.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data, {delimiter: ','}))
      }
    })
  }).then(list => (list.map(c => ({...c, code_commune: c.ccommune, nom_com: c.nomcom, bassin_id: c.be19, bassin_name: c.nombre19}))))
}

export function getAllCitiesWithLittoral() {
  return axios.get(config.API_LOI_LITTORAL)
    .then(result => (result.data))
}