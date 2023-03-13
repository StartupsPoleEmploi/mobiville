import Router from '@koa/router'
import { searchJobCount } from '../utils/pe-api'
import { getHiringRateDept } from '../utils/smart-emploi-api'
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
    topCities = (
      await models.cities.getCitiesByCodeRegion({
        codeRegion: code,
      })
    )
      .sort((d1, d2) => d2.population - d1.population)
      .slice(0, 10)
  }

  response.body = JSON.stringify({
    ...departement.dataValues,
    cities: undefined,
    topCities: topCities,
  })
})

/** Top 10 des métiers (code Rome) avec le plus de bassin en tension sur le département */
router.get('/:code/topJobs', async ({ params: { code }, models, response }) => {
  // cas département outremer
  if (['1', '2', '3', '4', '5', '6'].includes(code)) {
    code = `97${code}`
  }
  const result = await models.tensions.findTopJobsByDepartement({
    codeDepartement: code,
    maxItems: 10,
  })
  response.body = result
})

/** TauxdEmbauche sur mobiville === acces a l'emploi catégorie A et B ACC_1  */
router.get('/:code/hiringRate', async ({ params: { code }, response }) => {
  const { tauxEmbauche } = await getHiringRateDept({ codeTerritoire: code })
  response.body = {
    codeDepartement: code,
    hiringRate: tauxEmbauche,
  }
})

export default router
