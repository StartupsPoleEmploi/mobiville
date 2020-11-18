import config from 'config'
import axios from 'axios'
import {stringify} from 'querystring'

export function getAccessToken() {
  return axios.post(`${config.ENTERPRISE_URL}/connexion/oauth2/access_token?realm=%2Fpartenaire`, stringify({
    grant_type: 'client_credentials',
    client_id: config.EMPLOI_STORE_ID,
    client_secret: config.EMPLOI_STORE_SECRET,
    scope: `api_offresdemploiv2 application_${config.EMPLOI_STORE_ID} o2dsoffre`,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(result => (result.data))
    .then(data => data.access_token || null)
}

export async function searchJob({codeRome = []}) {
  const token = await getAccessToken()
  return axios.get('https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search', {
    params: {
      codeROME: codeRome.join(','),
      departement: '93',
    },
    headers: {Authorization: `Bearer ${token}`},
  }).then(result => (result.data))
}