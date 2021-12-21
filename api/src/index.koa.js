import Koa from 'koa'
import koaBody from 'koa-body'
import compress from 'koa-compress'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import config from 'config'
import { start as startCrons } from './crons'
import session from 'koa-session'
import { RateLimit } from 'koa2-ratelimit'

import db from './models'

import citiesRoutes from './koa-routes/cities'
import helpsRoutes from './koa-routes/helps'
import ogrsRoutes from './koa-routes/ogrs'
import professionsRoutes from './koa-routes/professions'

const app = new Koa()

app.context.models = db.initModels()
app.context.sequelize = db.instance
app.keys = config.koaKeys

db.migrations().then(() => {
  db.seeders().then(async () => {
    startCrons(app.context.models) // start crons
  })
})

// we add the relevant middlewares to our API
app.use(cors({ credentials: true })) // add cors headers to the requests
app.use(helmet()) // adds various security headers to our API's responses
app.use(RateLimit.middleware({ interval: { min: 1 }, max: 100 }))

app.use(
  koaBody({
    multipart: true,
    formLimit: '1mb',
    textLimit: '1mb',
    jsonLimit: '1mb',
  })
) // automatically parses the body of POST/PUT/PATCH requests, and adds it to the koa context

app.use(professionsRoutes.routes()).use(professionsRoutes.allowedMethods())
app.use(citiesRoutes.routes()).use(citiesRoutes.allowedMethods())
app.use(helpsRoutes.routes()).use(helpsRoutes.allowedMethods())
app.use(ogrsRoutes.routes()).use(ogrsRoutes.allowedMethods())
app.use(compress({}))
app.use(session(config.SESSION_CONFIG, app))

app.listen(config.port)
