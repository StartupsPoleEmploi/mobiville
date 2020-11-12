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
  }).then(list => (list.map(item => ({...item, rome: (item.libfap || ':').split(':')[0].trim()}))))
}

export function getAllCitiesWithLittoral() {
  return axios.get(config.API_LOI_LITTORAL)
    .then(result => (result.data))
}