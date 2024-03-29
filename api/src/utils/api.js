import config from 'config'
import axios from 'axios'
import { ungzip } from 'node-gzip'
import { csvToArrayJson } from './csv'
import { createReadStream, readFile, readFileSync, statSync } from 'fs'
import bz2 from 'unbzip2-stream'
import parser from 'xml2json'
import { readdir } from 'fs/promises'

let romeLabelFile = null
const cheerio = require('cheerio')

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
      bassin_name: c.nombe19,
    }))
  )
}

export function getFranceShape() {
  let rawdata = readFileSync(
    __dirname + '/../assets/datas/france-shape-side-sea.geo.json'
  )
  return JSON.parse(rawdata).features[0].geometry.coordinates.flat(2)
}

function customizeImageCity(strImage) {
  if (strImage && strImage.includes('/undefined')) {
    return null
  }
  let urlImage = 'https:' + strImage
  const myArray = urlImage.split('/')
  let strFull = ''
  for (let i = 0; i < 9; i++) {
    strFull += myArray[i] + '/'
  }
  let strNew = '2000px-' + myArray[8]
  return strFull + strNew
}

const fetchHtml = async (pageid) => {
  const pageUrl = `https://fr.wikipedia.org/w/index.php?action=render&curid=${pageid}`
  try {
    console.log('fetchHTML : ' + pageUrl)
    const { data } = await axios.get(pageUrl, { ...config.proxyPeOverrides })
    return data
  } catch (err) {
    console.error(
      'ERROR fetchHtml: An error occurred while trying to fetch the URL: ' +
        pageUrl +
        ' ERROR : ' +
        err
    )
  }
}

// obligé de faire un async / wait : ne fonctionne pas en get / then (why !?)
export const getCrawledImageCity = async (pageid) => {
  const html = await fetchHtml(pageid)
  if (html) {
    const $ = cheerio.load(html)
    return customizeImageCity(
      $('body')
        .find('table.infobox,.infobox_v2 tbody tr:nth-child(2) td > a > img')
        .attr('src')
    )
  } else {
    return null
  }
}

export const wikipediaDetails = (pageName) =>
  axios
    .get(
      `https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts%7Cpageimages&piprop=original&exintro&explaintext&generator=search&gsrsearch=%22${pageName}%22%20+deepcat:%22Article%20avec%20mod%C3%A8le%20Infobox%20Commune%20de%20France%22&gsrlimit=1&redirects=1`,
      { ...config.proxyPeOverrides }
    )
    .then((response) => {
      if (response.data && response.data.query && response.data.query.pages) {
        return Object.values(response.data.query.pages)[0]
      }

      return null
    })
    .catch((err) => console.error('ERROR', err))

export const wikipediaDepartementDetails = (departemantName) =>
  axios
    .get(
      `https://api.wikimedia.org/core/v1/wikipedia/fr/search/page?q=${encodeURIComponent(
        departemantName + ' département'
      )}&limit=5`,
      { ...config.proxyPeOverrides }
    )
    .then((r) => {
      const choix1 = r.data.pages.find(
        (p) => p.key.includes(departemantName) && p.key.includes('département')
      )
      const pageDepartements = r.data.pages.filter((page) =>
        page.description
          ? page.key.includes('département') ||
            page.description.includes('département') ||
            page.excerpt.includes('département')
          : true
      )
      return choix1 ? choix1 : pageDepartements[0]
    })
    .then((pageDepartement) =>
      axios.get(
        `https://api.wikimedia.org/core/v1/wikipedia/fr/page/${encodeURIComponent(
          pageDepartement.key
        )}/html`,
        { ...config.proxyPeOverrides }
      )
    )
    .then((response) => {
      const $ = cheerio.load(response.data)

      // Avoir un id equivaut a ne pas etre dans un bandeau d'entete
      const summary = $('body').find(`section:first-child p:has([id])`)

      const nomPhonetique = /\((\/|)(.*?)\) /g
      const annotations = /\[(.*?)\]/g

      return summary
        .text()
        .replace(nomPhonetique, '')
        .replace(annotations, '')
        .substring(0, 4096)
    })
    .catch((err) => console.error('ERROR', err))

// source : https://www.data.gouv.fr/en/datasets/temperature-quotidienne-departementale-depuis-janvier-2018/
export const getDepartementTemperatures = () => {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/temperature-quotidienne-departementale.csv',
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(csvToArrayJson(data, { delimiter: ';' }))
        }
      }
    )
  })
}

export const getAllRegions = () => {
  let rawdata = readFileSync(__dirname + '/../assets/datas/regions.json')
  return JSON.parse(rawdata)
}

export const getTensionsCities = () => {
  let rawdata = readFileSync(
    __dirname + '/../assets/datas/donnees-de-reference_zonage-commune.json'
  )
  return JSON.parse(rawdata).zonageCommunes
}

export function getEquipmentsDatas() {
  return new Promise((resolve, reject) => {
    readFile(
      __dirname + '/../assets/datas/BPE2021-tweaked.json.gz',
      (err, bufferData) => {
        if (err) return reject(err)

        ungzip(bufferData)
          .then((data) => {
            resolve(JSON.parse(data.toString()))
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

export function getPCSByRome(rome) {
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

              if (codeRome.toLowerCase() === rome.toLowerCase() && !!codeFaq) {
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

export const getAllDepartements = () => {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/departements.csv', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data, { delimiter: ';', emptyAsNull: true }))
      }
    })
  })
}

export const getCitiesRent = () => {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/cities_rent.csv', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data, { delimiter: ';' }))
      }
    })
  })
}

export const getAllSecteursBassins = () => {
  const dir = '/mnt/datalakepe/depuis_datalake'
  return new Promise((resolve, reject) => {
    readdir(dir)
      .then(
        (files) =>
          files
            .filter(fileName => fileName.includes('extract_mobiville_dpae_full'))
            .map((fileName) => ({
              name: fileName,
              time: statSync(`${dir}/${fileName}`).mtime.getTime(),
            }))
            .sort((a, b) => a.time - b.time)
            .map(file => file.name)
          )
      .then(filesName => {
        if (!filesName || filesName.length < 1) reject(new Error("Sync secteurs bassins failed : Can't find file"))

        return filesName[0]
      })
      .then((fileName) => {
        const reader = createReadStream(`${dir}/${fileName}`)
          .pipe(bz2())
    
        let fetchData = ''
        reader.on('data', (chunk) => (fetchData += chunk))
        reader.on('end', () => {
          resolve(
            csvToArrayJson(fetchData, { delimiter: ';' }).then((data) =>
              data.map((row) => ({
                code_bassin: row.code_bassinemploi,
                demandeurs_emploi: row.nb_de,
                secteur_libelle: row.secteur,
              }))
            )
          )
        })
        reader.on('error', (err) => reject(err))
        
      })
      .catch(error => console.error(error))
  })
}
