import { compact } from 'lodash'
import Router from '@koa/router'

import { searchCloseCompanies } from '../utils/pe-api'
import { CRITERIONS } from '../constants/criterion'

const router = new Router({ prefix: '/cities' })

router.post(
  '/search',
  async ({
    request: {
      body: {
        codeCity,
        codeRegion,
        codeDepartement,
        codeEnvironment,
        codeRome,
        index,
        onlySearchInTension,
        opportunity,
        sortBy,
      },
    },
    response,
    models,
  }) => {
    let order
    switch (sortBy) {
      case 'mer':
        order = [['distance_from_sea', 'ASC']]
        break
      case 'montagne':
        order = [['z_moyen', 'DESC']]
        break
      default:
        break
    }

    const [queryResult, totalResults] = await models.cities.search({
      codeRegion,
      codeDepartement,
      codeCriterion: compact([codeCity, codeEnvironment]),
      codeRome,
      onlySearchInTension,
      order,
      offset: index,
      opportunity,
    })

    response.body = {
      list: queryResult,
      total: totalResults,
      index,
    }
  }
)

router.post(
  '/search-close-cities',
  async ({
    request: {
      body: { latitude, longitude, codeRome, inseeCode },
    },
    models,
    response,
  }) => {
    response.body = await models.cities.searchCloseCities({
      latitude,
      longitude,
      codeRome,
      inseeCode,
    })
  }
)

router.post(
  '/search-similar-cities',
  async ({
    request: {
      body: { codeRome, city },
    },
    models,
    response,
  }) => {
    response.body = await models.cities.searchSimilarCities({
      codeRome,
      city,
    })
  }
)

router.post(
  '/search-by-skill',
  async ({
    request: {
      body: { label },
    },
    models,
    response,
  }) => {
    // Temporarily disable the search by skill to only
    // use the search by job title (OGR)
    const resultFromSkill = []
    // const resultFromSkill = await models.cities.models.romeskills.searchByLabel(label)

    const resultFromOgr = await models.romeogrs.searchByLabel(label)

    response.body = resultFromSkill.concat(resultFromOgr)
  }
)

router.post(
  '/autocomplete',
  async ({
    request: {
      body: { query },
    },
    models,
    response,
  }) => {
    response.body = await models.cities.getCitiesForAutoComplete(query)
  }
)

router.get('/criterions', async ({ models, response }) => {
  const [jobList, regionsTensionsCriterions] = await Promise.all([
    models.tensions.fetchJobList(),
    models.regionsTensionsCriterions.findOne().then((row) => row.json || []),
  ])

  response.body = {
    criterions: CRITERIONS,
    regions: JSON.parse(regionsTensionsCriterions),
    codeRomes: jobList.map((job) => ({
      key: job.rome,
      label: job.label,
    })),
  }
})

router.get('/load/:insee', async ({ params: { insee }, models, response }) => {
  response.body = await models.cities.getCity({ insee })
})

router.post(
  '/search-close-companies',
  async ({
    request: {
      body: { codeRome, insee, sort },
    },
    response,
  }) => {
    const lbbData = await searchCloseCompanies({
      codeRome,
      insee,
      distance: 30,
      page: 1,
      pageSize: 10,
      sort: sort,
    })
    response.body = {
      companies: lbbData.companies
        .sort((c1, c2) => c2.stars - c1.stars)
        .slice(0, 10)
        .map(({ name, city, url }) => ({ name, city, url })),
      companies_count: lbbData.companies_count,
    }
  }
)

/** Top 10 des métiers en tension sur la ville */
router.get(
  '/:insee/topJobs',
  async ({ params: { insee }, models, response }) => {
    const result = await models.tensions.findTopJobs({
      insee,
    })
    response.body = result
  }
)

export default router
