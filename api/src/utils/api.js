import config from 'config'
import axios from 'axios'
import { ungzip } from 'node-gzip'
import { csvToArrayJson } from './csv'
import { readFile, readFileSync } from 'fs'
import parser from 'xml2json'

let romeLabelFile = null

export function getAllCities() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/cities-france.csv', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  })
}

export function getAllTensions() {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/cities-tension-utf8.csv',
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(csvToArrayJson(data))
        }
      }
    )
  }).then((list) =>
    list.map((c) => ({
      ...c,
      bassin_id: c.cbassin,
      bassin_lib: c.lib_bassin_bmo19,
      defm: 0,
      dee: null,
      oee_nosais: null,
      ind_t: c.ind_tension_d,
    }))
  )
}

export function getAllBassins() {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/lexique-bassins.csv',
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(csvToArrayJson(data, { delimiter: ',' }))
        }
      }
    )
  }).then((list) =>
    list.map((c) => ({
      ...c,
      code_commune: c.ccommune,
      nom_com: c.nomcom,
      bassin_id: c.be19,
      bassin_name: c.nombre19,
    }))
  )
}

export function getFranceShape() {
  let rawdata = readFileSync(
    __dirname + '/../assets/datas/france-shape-side-sea.geo.json'
  )
  return JSON.parse(rawdata).features[0].geometry.coordinates.flat(2)
}

export function getFrenchWeatherStation() {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/french-weather-station-list.csv',
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(csvToArrayJson(data, { delimiter: ',' }))
        }
      }
    )
  })
}

export function loadWeatherFile(stationId) {
  return axios
    .get(config.weatherFile(stationId))
    .then((data) => data.data.split('\r\n'))
}

export const wikipediaDetails = (pageName) =>
  axios
    .get(
      `https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts%7Cpageimages&piprop=original&exintro&explaintext&generator=search&gsrsearch=%22${pageName}%22%20+deepcat:%22Article%20avec%20mod%C3%A8le%20Infobox%20Commune%20de%20France%22&gsrlimit=1&redirects=1`
    )
    .then((response) => {
      if (response.data && response.data.query && response.data.query.pages) {
        return Object.values(response.data.query.pages)[0]
      }

      return null
    })

export const getAllRegions = () => {
  let rawdata = readFileSync(
    __dirname + '/../assets/datas/anciennes-nouvelles-regions.json'
  )
  return JSON.parse(rawdata).regions.map((r) => ({ ...r.fields }))
}

export const getRegionsSocialHousing = () => {
  let rawdata = readFileSync(
    __dirname + '/../assets/datas/regions-social-housing.json'
  )
  return JSON.parse(rawdata)
}

export function getAveragePricing() {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/dvf-communes-2019.csv',
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(csvToArrayJson(data))
        }
      }
    )
  })
}

export const getTensionsCities = () => {
  let rawdata = readFileSync(
    __dirname + '/../assets/datas/donnees-de-reference_zonage-commune.json'
  )
  return JSON.parse(rawdata).zonageCommunes
}

export function getAverageHouseRent() {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/indicateurs-loyers-appartements.csv',
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(csvToArrayJson(data))
        }
      }
    )
  })
}

export function getEquipmentsDatas() {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/bpe19_ensemble_xy.csv.gz',
      (err, bufferData) => {
        if (err) return reject(err)

        ungzip(bufferData)
          .then((data) => {
            resolve(csvToArrayJson(data.toString()))
          })
          .catch(err)
      }
    )
  })
}

export function getRomeLabel(rome) {
  return new Promise((resolve, reject) => {
    if (romeLabelFile) {
      resolve(romeLabelFile[rome] || 'unknow')
    } else {
      readFile(
        __dirname + '/../assets/datas/unix_referentiel_code_rome_v346_utf8.xml',
        (err, data) => {
          if (err) {
            reject(err)
          } else {
            romeLabelFile = {}
            JSON.parse(parser.toJson(data)).ogr.item_referentiel_code_rome.map(
              (xmlObj) => {
                romeLabelFile[xmlObj.code_rome] = xmlObj.libelle
              }
            )
            resolve(romeLabelFile[rome] || 'unknow')
          }
        }
      )
    }
  })
}

export function getPCSByRome(rome, fap) {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/table-correspondance-pcs-rome.csv',
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          let finded = null
          csvToArrayJson(data, {
            columns: false,
          }).then((l) => {
            let codeFaq = ''
            let codePcs = ''
            let codeRome = ''
            for (let x = 0; x < l.length; x++) {
              const row = l[x]

              if (row['0'] && row['0'].length === 5) {
                codeFaq = row['0']
              }
              if (row['1']) {
                codePcs = row['1']
              }
              if (row['2'] && row['2'].length === 5) {
                codeRome = row['2']
              }

              if (
                codeRome.toLowerCase() === rome.toLowerCase() &&
                codeFaq.toLowerCase() === fap.toLowerCase()
              ) {
                finded = codePcs
                break
              }
            }

            resolve(finded)
          })
        }
      }
    )
  })
}
