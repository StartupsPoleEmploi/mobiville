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

export default router
