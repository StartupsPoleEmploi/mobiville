import { join } from 'path'
import { App as AppBase } from 'koa-smart'
const koaBody = require('koa-body')
import {
  i18n,
  compress,
  cors,
  helmet,
  addDefaultBody,
  logger,
} from 'koa-smart/middlewares'
import config from 'config'
import { start as startCrons } from './crons'
import session from 'koa-session'

import db from './models'

export default class App extends AppBase {
  // the starting class must extend appBase, provided by koa-smart
  constructor() {
    super({
      port: config.port,
      // routeParam is an object and it will be give as parametter to all routes
      // so for example you can give models to all your route so you can access on route
      routeParam: {},
    })
  }

  async start() {
    this.models = db.initModels()
    this.routeParam.models = this.models
    this.routeParam.replicaModels = this.replicaModels
    this.koaApp.context.sequelize = db.instance
    this.koaApp.context.models = this.models
    this.koaApp.keys = config.koaKeys

    db.migrations().then(() => {
      db.seeders().then(async () => {
        startCrons(this) // start crons
      })
    })

    super.addMiddlewares([
      // we add the relevant middlewares to our API
      cors({ credentials: true }), // add cors headers to the requests
      helmet(), // adds various security headers to our API's responses
      koaBody({
        multipart: true,
        formLimit: '512mb',
        textLimit: '512mb',
        jsonLimit: '512mb',
      }), // automatically parses the body of POST/PUT/PATCH requests, and adds it to the koa context
      i18n(this.koaApp, {
        directory: join(__dirname, 'locales'),
        extension: '.json',
        locales: ['en', 'fr'],
        modes: ['query', 'subdomain', 'cookie', 'header', 'tld'],
      }), // allows us to easily localize the API
      logger(), // gives detailed logs of each request made on the API
      addDefaultBody(), // if no body is present, put an empty object "{}" in its place.
      compress({}), // compresses requests made to the API
      session(config.SESSION_CONFIG, this.koaApp),
    ])
    super.mountFolder(join(__dirname, 'routes'), '/') // adds a folder to scan for route files

    return super.start()
  }
}
