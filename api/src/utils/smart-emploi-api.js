import config from 'config'
import axios from 'axios'
import { getAccessToken } from './pe-api'
import HttpsProxyAgent from 'https-proxy-agent'
import { fetchAndRetryIfNecessary } from './utils'
import { setupCache } from 'axios-cache-adapter'

const axiosCommonOptions = async () => ({
  headers: {
    Authorization: `Bearer ${await getAccessToken()}`,
    'Content-Type': 'application/json',
  },
  ...(config.PE_ENV && { proxy: false }),
  ...(config.PE_ENV && {
    httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000'),
  }),
})

const cache = setupCache({
  // cache de 72h
  maxAge: 72 * 60 * 60 * 1000,
  exclude: {
    query: false,
  },
})
const apiEmploiStore = axios.create({
  adapter: cache.adapter,
})

/** Pseudo "Taux d'embauche"
 *  aka ACC_1/Taux d'access a l'emploi categorie a et b
 *  pour une 'ville' (bassin BMO) pour un métier (code Rome) donnée sur le dernier trimestre
 *  Cette requete est mise en cache 72h
 * @returns
 */
export async function getHiringRate({ codeTerritoire, codeRome = null }) {
  const result = await fetchAndRetryIfNecessary(async () =>
    apiEmploiStore
      .post(
        `${config.EMPLOI_STORE_URL}/partenaire/stats-perspectives-retour-emploi/v1/indicateur/stat-acces-emploi`,
        {
          codeTypeTerritoire: 'BASBMO',
          codeTerritoire: `${codeTerritoire}`,
          codeTypeActivite: codeRome ? 'ROME' : 'CUMUL',
          codeActivite: codeRome ? `${codeRome}` : 'CUMUL',
          codeTypePeriode: 'TRIMESTRE',
          dernierePeriode: true,
          sansCaracteristiques: true,
          codeTypeNomenclature: 'DUREEEMP',
        },
        { ...(await axiosCommonOptions()) }
      )
      .catch((error) => {
        if (error.response?.data?.message.includes('Status code = 404')) {
          console.info(
            `api StatEmbauche: 404 pour ${codeTerritoire},${codeRome}`
          )
          return null
        }
        console.log(error)
        return error.response
      })
  )

  if (!result || !result.listeValeursParPeriode) return null
  return Math.round(result.listeValeursParPeriode[0]?.valeurSecondaireTaux)
}

/** Pseudo "Taux d'embauche"
 *  indicateur ACC_1 smartEmploi
 *  pour un département pour un métier (code Rome) donnée sur le dernier trimestre
 *  Cette requete est mise en cache 72h
 * @returns
 */
export async function getHiringRateDept({
  codeTerritoire,
  codeRome = undefined,
}) {
  // cas département outremer
  if (['1', '2', '3', '4', '5', '6'].includes(codeTerritoire)) {
    codeTerritoire = `97${codeTerritoire}`
  }
  return fetchAndRetryIfNecessary(async () =>
    apiEmploiStore
      .post(
        `${config.EMPLOI_STORE_URL}/partenaire/stats-perspectives-retour-emploi/v1/indicateur/stat-acces-emploi`,
        {
          codeTypeTerritoire: 'DEP',
          codeTerritoire: `${codeTerritoire}`,
          codeTypeActivite: codeRome ? 'ROME' : 'CUMUL',
          codeActivite: codeRome ? `${codeRome}` : 'CUMUL',
          codeTypePeriode: 'TRIMESTRE',
          dernierePeriode: true,
          sansCaracteristiques: true,
          codeTypeNomenclature: 'DUREEEMP',
        },
        { ...(await axiosCommonOptions()) }
      )
      .catch((error) => {
        if (error.response?.data?.message.includes('Status code = 404')) {
          console.info(
            `api StatEmbauche: 404 pour ${codeTerritoire},${codeRome}`
          )
          return null
        }
        console.log(error)
        return error.response
      })
  ).then((data) => mapEmbaucheData(codeTerritoire, codeRome, data))
}

function mapEmbaucheData(codeDept, codeRome, data) {
  const stat = (!!data?.listeValeursParPeriode?.length > 0) ? data?.listeValeursParPeriode[0] : null

  // cas département outremer
  if (['971', '972', '973', '974', '975', '976'].includes(codeDept)) {
    codeDept = codeDept.replace('97', '')
  }
  return {
    codeDepartement: codeDept,
    codeRome: codeRome,
    libelleRome: stat ? stat.libActivite : null,
    codePeriode: stat ? stat.codePeriode : null,
    libellePeriode: stat ? stat.libPeriode : null,
    embauche: stat ? stat.valeurPrincipaleNombre : null,
    tauxEmbauche: stat ? stat.valeurSecondaireTaux : null,
  }
}
