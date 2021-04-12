import config from 'config'
import axios from 'axios'
import {stringify} from 'querystring'

export function getAccessToken() {
  return axios.post(`${config.ENTERPRISE_URL}/connexion/oauth2/access_token?realm=%2Fpartenaire`, stringify({
    grant_type: 'client_credentials',
    client_id: config.EMPLOI_STORE_ID,
    client_secret: config.EMPLOI_STORE_SECRET,
    scope: `api_infotravailv1 api_offresdemploiv2 application_${config.EMPLOI_STORE_ID} o2dsoffre`,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(result => (result.data))
    .then(data => data.access_token || null)
}

export async function searchJob({codeRome = [], insee = [], distance = 10}) {
  const token = await getAccessToken()
  return axios.get('https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search', {
    params: {
      codeROME: codeRome.join(','),
      commune: insee.join(','),
      distance,
    },
    headers: {Authorization: `Bearer ${token}`},
  }).then(result => (result.data))
}

export async function infosTravail({codeProfession, codeRegion}) {
  const token = await getAccessToken()
  // CONVERTIR CODE ROME EN PCS_PROFESSION_CODE
  return axios.get(`https://api.emploi-store.fr/partenaire/infotravail/v1/datastore_search_sql?sql=SELECT * FROM "d9090eaf-65cd-41cb-816f-7249897a3e51" WHERE "AREA_CODE" = '${codeRegion}' AND "PCS_PROFESSION_CODE" = '${codeProfession}'`, {
    headers: {Authorization: `Bearer ${token}`},
  }).then(result => (result.data))
}