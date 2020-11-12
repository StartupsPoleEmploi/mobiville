import Route from './Route'
import {Types} from '../utils/types'
import { searchJob } from '../utils/pe-api'

export default class RouteProfessions extends Route {
  constructor(params) {
    super({ ...params })
  }

  /**
   * @body {[string]} [code_rome]
   * @body {[int]} [postal_code]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      code_rome: Types.array().type(Types.string()).required(),
      postal_code: Types.array().type(Types.number()).required(),
    }),
  })
  async search(ctx) {
    const {code_rome: codeRome} = this.body(ctx)

    // const cp

    const result = await searchJob({codeRome})

    this.sendOk(ctx, result)
  }
}
