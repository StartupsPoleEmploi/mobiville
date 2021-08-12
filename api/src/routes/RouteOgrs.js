import Route from './Route'

export default class RouteOgrs extends Route {
  constructor(params) {
    super({ ...params, model: 'romeogrs' })
  }

  @Route.Get({ path: '/' })
  async get(ctx) {
    const result = await this.model.fetchAllAvailable()

    this.sendOk(ctx, result)
  }
}
