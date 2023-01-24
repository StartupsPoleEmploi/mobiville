import Router from '@koa/router'
import { searchJobCount } from '../utils/pe-api'
import { getTotalOffres } from '../utils/utils'

const router = new Router({ prefix: '/departement' })

router.get('/:code/jobs', async ({ params: { code }, response }) => {
  const jobOffers = await searchJobCount({
    departement: code,
  })

  response.body = JSON.stringify(getTotalOffres(jobOffers))
})
router.get('/:code', async ({ params: { code }, models, response }) => {
  const departement = await models.departements.getDepartement({ code })
  
  let topCities = departement.dataValues.cities
  // Cas des DOM avec regions uni-départemental
  if (['1', '2', '3', '4', '5', '6'].includes(code)) {
    topCities = (await models.cities.getCitiesByCodeRegion({
        codeRegion: code,
      }))
      .sort((d1, d2) => d2.population - d1.population)
      .slice(0, 10)
  }

  response.body = JSON.stringify({
    ...departement.dataValues,
    cities: undefined,
    topCities: topCities,
  })
})

/** Top 10 des métiers (code Rome) avec le plus d'offre d'emploi sur le département */
router.get('/:code/topJobs', async ({ params: { code }, models, response }) => {
  // todo

  response.body = await models.embaucheDepartements.getTopEmbauche({
    codeDepartement: code,
    maxItems: 10,
  })
})

/** Top 10 des métiers (code Rome) avec le plus d'offre d'emploi sur le département */
router.get(
  '/:code/hiringRate',
  async ({ params: { code }, models, response }) => {
    // todo
    const jobs = await models.embaucheDepartements.getTopEmbauche({
      codeDepartement: code,
      maxItems: 1000,
    })
    const hiringRate =
      jobs.map((j) => j.tauxEmbauche).reduce((t1, t2) => t1 + t2, 0) /
      jobs.length
    response.body = {
      codeDepartement: code,
      hiringRate: hiringRate ? hiringRate : 0,
    }
  }
)

export default router
