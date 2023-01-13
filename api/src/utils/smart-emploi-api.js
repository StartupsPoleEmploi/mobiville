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

/** Taux d'embauche pour une 'ville' (bassin BMO)
 *  pour un métier (code Rome) donnée sur le dernier trimestre
 *  Cette requete est mise en cache 72h
 * @param {*} param0
 * @returns
 */
export async function getHiringRate({ codeTerritoire, codeRome }) {
  return fetchAndRetryIfNecessary(async () =>
    apiEmploiStore
      .post(
        `${config.EMPLOI_STORE_URL}/partenaire/stats-offres-demandes-emploi/v1/indicateur/stat-embauches`,
        {
          codeTypeTerritoire: 'BASBMO',
          codeTerritoire: `${codeTerritoire}`,
          codeTypeActivite: 'ROME',
          codeActivite: `${codeRome}`,
          codeTypePeriode: 'TRIMESTRE',
          codeTypeNomenclature: 'CATCANDxDUREEEMP',
          dernierePeriode: true,
          sansCaracteristiques: true,
        },
        { ...(await axiosCommonOptions()) }
      )
      .then((result) => result.data)
      .then((result) => {
        if (!result || !result.listeValeursParPeriode) return null

        const preferedCategories = ['ABCDE-SUP1M', 'ABCDE-TOUTE', 'TOUT-TOUTE']
        const foundCategories = result.listeValeursParPeriode.map(
          (data) => data.codeNomenclature
        )

        const bestCategory = preferedCategories.find((category) =>
          foundCategories.includes(category)
        )
        return result.listeValeursParPeriode.find(
          (data) => data.codeNomenclature === bestCategory
        ).valeurSecondairePourcentage
      })
      .catch((error) => {
        console.log(error)
        return error.response
      })
  )
}

/** Total d'embauche par departement par métier au dernier trimestre
 *
 * @param {*} param0
 * @returns
 */
export async function getEmbaucheByDepartement(codeDepartement, codeRome) {
  // cas département outremer
  if (['1', '2', '3', '4', '5', '6'].includes(codeDepartement)) {
    codeDepartement = `97${codeDepartement}`
  }

  return fetchAndRetryIfNecessary(async () =>
    axios
      .post(
        `${config.EMPLOI_STORE_URL}/partenaire/stats-offres-demandes-emploi/v1/indicateur/stat-embauches`,
        {
          codeTypeTerritoire: 'DEP',
          codeTerritoire: `${codeDepartement}`,
          codeTypeActivite: 'ROME',
          codeActivite: `${codeRome}`,
          codeTypePeriode: 'TRIMESTRE',
          codeTypeNomenclature: 'CATCANDxDUREEEMP',
          dernierePeriode: true,
          sansCaracteristiques: true,
        },
        { ...(await axiosCommonOptions()) }
      )
      .catch((error) => {
        console.log(error)
        return error.response
      })
  ).then((data) => mapEmbaucheData(codeDepartement, codeRome, data))
}

async function mapEmbaucheData(codeDept, codeRome, response) {
  let statFound = null

  if (response && response.listeValeursParPeriode) {
    statFound = response.listeValeursParPeriode.find(
      (data) => data.codeNomenclature === 'ABCDE-TOUTE'
    )
  }
  // cas département outremer
  if (['971', '972', '973', '974', '975', '976'].includes(codeDept)) {
    codeDept = codeDept.replace('97', '')
  }
  return {
    codeDepartement: codeDept,
    codeRome: codeRome,
    libelleRome: statFound ? statFound.libActivite : null,
    codePeriode: statFound ? statFound.codePeriode : null,
    libellePeriode: statFound ? statFound.libPeriode : null,
    embauche: statFound ? statFound.valeurPrincipaleNombre : 0,
    tauxEmbauche: statFound ? statFound.valeurSecondairePourcentage : 0,
  }
}
