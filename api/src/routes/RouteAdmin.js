import Route from './Route'

export default class RouteAdmin extends Route {
  constructor(params) {
    super({ ...params, model: 'stats' })
  }

  /**
   * @body {[string]} [code_rome]
   * @body {[string]} [insee]
   */
  @Route.Get()
  async searchs(ctx) {
    const list = await this.model.getSearchs()
    this.sendOk(ctx, list)
  }
}
