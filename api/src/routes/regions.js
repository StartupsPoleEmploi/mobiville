import Router from '@koa/router'
import { searchJobCount } from '../utils/pe-api'
import { getTotalOffres } from '../utils/utils'

const router = new Router({ prefix: '/region' })

router.get('/', async ({ models, response }) => {
  const region = await models.regions.findAll({
    include: [
      models.departements,
      {
        model: models.cities,
        order: [['population', 'DESC']],
        limit: 6
      }
    ],
  })
  response.body = region
})

router.get('/:code', async ({ params: { code }, models, response }) => {
  const region = await models.regions.findOne({
    where: { code },
    include: [models.departements],
  })

  const biggestCities = await models.cities.findAll({
    where: { code_region: code },
    order: [['population', 'DESC']],
    limit: 6,
  })
  region.dataValues.biggestCities = biggestCities

  response.body = region
})

router.get('/:code/jobs', async ({ params: { code }, response }) => {
  const jobOffers = await searchJobCount({
    region: code
  })

  response.body = JSON.stringify(getTotalOffres(jobOffers))
})

export default router
