import config from 'config'
import axios from 'axios'
import { stringify } from 'querystring'
import HttpsProxyAgent from 'https-proxy-agent'
import { setupCache } from 'axios-cache-adapter'
import { fetchAndRetryIfNecessary } from './utils'

// cache de 15 minutes pour le token
const cacheToken = setupCache({
    maxAge: 15 * 60 * 1000,
    exclude: {
        query: false
    }
})
const cache = setupCache({
    // cache de 24h
    maxAge: 24 * 60 * 60 * 1000,
    exclude: {
        query: false
    }
})
const apiEmploiStore = axios.create({
    baseURL: `${config.EMPLOI_STORE_URL}/partenaire/`,
    ...(config.PE_ENV && {proxy: false}),
    ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
    adapter: cache.adapter,
})

const apiEmploiStoreToken = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    // proxy PE + bug d'axios voir: https://github.com/axios/axios/issues/2072#issuecomment-609650888
    ...(config.PE_ENV && {proxy: false}),
    ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
    adapter: cacheToken.adapter,
})

export function getAccessToken() {
    return apiEmploiStoreToken
        .post(
            `${config.ENTERPRISE_URL}/connexion/oauth2/access_token?realm=%2Fpartenaire`,
            stringify({
                grant_type: 'client_credentials',
                client_id: config.EMPLOI_STORE_ID,
                client_secret: config.EMPLOI_STORE_SECRET,
                scope: `api_infotravailv1 api_offresdemploiv2 api_romev1 nomenclatureRome application_${config.EMPLOI_STORE_ID} o2dsoffre api_explorateurmetiersv1 explojob api_labonneboitev1 api_stats-offres-demandes-emploiv1 offresetdemandesemploi api_evenementsv1 evenements`,
            })
        )
        .then((result) => result.data)
        .then((data) => data.access_token || null)
}

export async function searchJob({ codeRome, insee = [], distance = 30 }) {
    const token = await getAccessToken()
    const callToOffres = function () {
        return apiEmploiStore.get(
            `offresdemploi/v2/offres/search`,
            {
                params: {
                    ...((codeRome && codeRome.length > 0) ? { codeROME: codeRome.join(',') } : null),
                    commune: insee.join(','),
                    distance
                },
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(async (result) => result)
            .catch((error) => {
                if(error.response.status !== 429) console.error(error)
                return error.response
            })
    }
    return fetchAndRetryIfNecessary(callToOffres)
}


export async function searchJobCount({ codeRome, insee, region, departement, distance = 10 }) {
    const token = await getAccessToken()

    let params = {
        range: '0-0',
    }
    if (codeRome) params.codeROME = codeRome.join(',')
    if (insee) params.commune = insee.join(',')
    if (distance) params.distance = distance
    if (region) params.region = region
    if (departement) params.departement = departement

    const callToOffres = function () {
       return apiEmploiStore.get(
        `offresdemploi/v2/offres/search`,
        {
            params,
            headers: { Authorization: `Bearer ${token}` },
        })
       .then(async (result) => result)
       .catch((error) => {
           if(error.response.status !== 429) console.error(error)
           return error.response
       })
    }
    return fetchAndRetryIfNecessary(callToOffres)
}

export async function infosTravail({ codeProfession, codeDept }) {
    const token = await getAccessToken()

    const request = `SELECT * FROM "d9090eaf-65cd-41cb-816f-7249897a3e51"\
        WHERE "AREA_CODE" = '${codeDept}'\
            AND "AREA_TYPE_CODE" = 'D'\
            ${codeProfession ? `AND "PCS_PROFESSION_CODE" = '${codeProfession}'` : ''}`;

    // CONVERTIR CODE ROME EN PCS_PROFESSION_CODE
    return axios
        .get(
            `${config.EMPLOI_STORE_URL}/partenaire/infotravail/v1/datastore_search_sql?sql=${request}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                ...(config.PE_ENV && {proxy: false}),
                ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
            }
        )
        .then((result) => result.data)
}

export async function infosTensionTravail({ codeRome, codeDept, bassinId }) {
    const token = await getAccessToken()

    const requestBassin = `SELECT * FROM "266f691f-bce8-4443-808e-8e5aa125cf17"
            WHERE ${codeRome ? `"ROME_PROFESSION_CARD_CODE" LIKE '${codeRome}' AND ` : ''}
            "AREA_TYPE_CODE" = 'B'
            AND "AREA_CODE" = '${bassinId}'`;
    
    const requestDepartement = `SELECT * FROM "266f691f-bce8-4443-808e-8e5aa125cf17"
        WHERE ${codeRome ? `"ROME_PROFESSION_CARD_CODE" LIKE '${codeRome}' AND ` : ''}
            "AREA_TYPE_CODE" = 'D'
            AND "AREA_CODE" = '${codeDept}'`;

    return Promise.all([
        axios.get(
            `${config.EMPLOI_STORE_URL}/partenaire/infotravail/v1/datastore_search_sql?sql=${requestBassin}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                ...(config.PE_ENV && {proxy: false}),
                ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
            }
        ),
        axios.get(
            `${config.EMPLOI_STORE_URL}/partenaire/infotravail/v1/datastore_search_sql?sql=${requestDepartement}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                ...(config.PE_ENV && {proxy: false}),
                ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
            }
        ),
    ]).then(([bassinResult, deptResult]) => ({
        bassin: bassinResult.data,
        dept: deptResult.data,
    }))
}

export async function getOgrFromRome(codeRome) {
    const token = await getAccessToken()
    return axios
        .get(
            `${config.EMPLOI_STORE_URL}/partenaire/rome/v1/metier/${codeRome}/appellation`,
            {
                headers: { Authorization: `Bearer ${token}` },
                ...(config.PE_ENV && {proxy: false}),
                ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
            }
        )
        .then((result) => result.data)
}

// Inutilisé
export async function getSkillFromLabel(label) {
    const token = await getAccessToken()
    return axios
        .get(
            `${config.EMPLOI_STORE_URL}/partenaire/explorateurmetiers/v1/explorateurmetiers?libelle=${label}&nombre=20&type=metier`,
            {
                headers: { Authorization: `Bearer ${token}` },
                ...(config.PE_ENV && {proxy: false}),
                ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
            }
        )
        .then((result) => result.data)
}

// Stocké en base mais non utilisé
export async function getSkillFromRome(codeRome) {
    const token = await getAccessToken()
    return axios
        .get(
            `${config.EMPLOI_STORE_URL}/partenaire/rome/v1/metier/${codeRome}/competence`,
            {
                headers: { Authorization: `Bearer ${token}` },
                ...(config.PE_ENV && {proxy: false}),
                ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
            }
        )
        .then((result) => result.data)
}

export async function searchCloseCompanies({
    codeRome = [],
    insee = '',
    distance = 30,
    page = 1,
    pageSize = 10,
    sort = 'distance'
}) {
    const token = await getAccessToken()
    const callToSearchCloseEnterprises = function () {

        // Beaucoup de code romes, on sépare la requête en 2
        if (codeRome.length > 200) {
            const firstHalf = codeRome.slice(0, Math.floor(codeRome.length / 2))
            const secondHalf = codeRome.slice(Math.floor(codeRome.length / 2), codeRome.length)

            return Promise.all([
                apiEmploiStore.get(
                    `labonneboite/v1/company`, {
                        params: {
                            rome_codes: firstHalf.join(','),
                            commune_id: insee,
                            distance,
                            page,
                            page_size: pageSize,
                            sort
                        },
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                apiEmploiStore.get(
                    `labonneboite/v1/company`, {
                        params: {
                            rome_codes: secondHalf.join(','),
                            commune_id: insee,
                            distance,
                            page,
                            page_size: pageSize,
                            sort
                        },
                        headers: { Authorization: `Bearer ${token}` },
                    }),
            ])
            .then(([r1, r2]) => {
                return {
                    data: {
                        companies: [...r1.data.companies, ...r2.data.companies],
                        companies_count: r1.data.companies_count + r2.data.companies_count
                    },
                    status: 200
                }
            })
            .catch((error) => {
                if(error.response.status !== 429) console.error(error)
                return error.response
            })
        } else {
            return apiEmploiStore.get(
                `labonneboite/v1/company`, {
                    params: {
                        rome_codes: codeRome.join(','),
                        commune_id: insee,
                        distance,
                        page,
                        page_size: pageSize,
                        sort
                    },
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(result => {
                    return {
                        data: {
                            companies: result.data.companies,
                            companies_count: result.data.companies_coun
                        },
                        status: 200
                    }
                })
                .catch((error) => {
                    if(error.response.status !== 429) console.error(error)
                    return error.response
                })
        }
    }
    return fetchAndRetryIfNecessary(callToSearchCloseEnterprises)
}

export async function events() {
    const token = await getAccessToken()
    const callToSearchCloseEnterprises = function () {
        return apiEmploiStore.get(
            `evenements/v1/salonsenligne`,
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(result => ({
                ...result,
                data: result.data.map(r => ({
                    ...r,
                    description: null
                }))
            }))
            .catch((error) => {
                if(error.response.status !== 429) console.error(error)
                return error.response
            })
}

    return fetchAndRetryIfNecessary(callToSearchCloseEnterprises)
}