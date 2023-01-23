import Router from '@koa/router'

import { events } from '../utils/pe-api'

const router = new Router({ prefix: '/events' })

router.get('/', async ({ response }) => {
  response.body = await events()
})

export default router
