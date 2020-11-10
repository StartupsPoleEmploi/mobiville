import Route from './Route'

export default class RouteCities extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })
  }

  @Route.Get()
  async list(ctx) {
    this.sendOk(ctx, await this.model.findAll())
  }
}
