import config from 'config'
import axios from 'axios'

export function getAccessToken() {
  return axios.post(`${config.ENTERPRISE_URL}/connexion/oauth2/access_token`, {
    grant_type: 'client_credentials',
    client_id: config.EMPLOI_STORE_ID,
    client_secret: config.EMPLOI_STORE_SECRET,
    scope: `application_${config.EMPLOI_STORE_ID}%20api_labonneboitev1`,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}