import Sequelize, { Op } from 'sequelize'
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
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('nom_comm')),
              'NOT LIKE',
              '%-ARRONDISSEMENT'
            )
          ]
        },
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
    where: {
      [Op.and]: [
        { code_region: code },
        Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('nom_comm')),
          'NOT LIKE',
          '%-ARRONDISSEMENT'
        )
      ]
    },
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
