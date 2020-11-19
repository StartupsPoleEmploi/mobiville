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
   * @body {[string]} [code_rome]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      code_region: Types.array().type(Types.number()),
      code_criterion: Types.array().type(Types.string()),
      code_rome: Types.array().type(Types.string()),
    }),
  })
  async search(ctx) {
    const {code_region, code_criterion, code_rome} = this.body(ctx)

    const result = await this.model.search({codeRegion: code_region, codeCriterion: code_criterion, codeRome: code_rome})

    this.sendOk(ctx, result)
  }

  @Route.Get()
  async criterions(ctx) {
    this.sendOk(ctx, {criterions: CRITERIONS, regions: await this.model.regions()})
  }

  @Route.Get({
    path: 'load/:insee',
  })
  async loadCity(ctx) {
    const {insee} = ctx.params
    const details = await this.model.getCity({insee})


    this.sendOk(ctx, details)
  }

}
