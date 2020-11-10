import Route from './Route'
import {Types} from '../utils/types'
import { searchJob } from '../utils/pe-api'

export default class RouteProfessions extends Route {
  constructor(params) {
    super({ ...params })
  }

  /**
   * @body {[string]} [code_rome]
   * @body {[int]} [code_region]
   * @body {[string]} [code_criterion]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      code_rome: Types.array().type(Types.string()).required(),
      code_region: Types.array().type(Types.number()),
      code_criterion: Types.array().type(Types.string()),
    }),
  })
  async search(ctx) {
    const {code_rome: codeRome} = this.body(ctx)

    // const cp

    const result = await searchJob({codeRome})

    this.sendOk(ctx, result)
  }
}
