import { CRITERIONS } from '../constants/criterion'
import { Types } from '../utils/types'
import Route from './Route'

export default class RouteCities extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })
  }

  @Route.Get()
  async list(ctx) {
    this.sendOk(ctx, await this.model.findAll())
  }

  /**
   * @body {[int]} [code_region]
   * @body {[string]} [code_criterion]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      code_region: Types.array().type(Types.number()),
      code_criterion: Types.array().type(Types.string()),
    }),
  })
  async search(ctx) {
    const {code_region, code_criterion} = this.body(ctx)

    const result = await this.model.search({code_region, code_criterion})

    this.sendOk(ctx, result)
  }

  @Route.Get()
  async criterions(ctx) {
    this.sendOk(ctx, {criterions: CRITERIONS, regions: await this.model.regions()})
  }
}
