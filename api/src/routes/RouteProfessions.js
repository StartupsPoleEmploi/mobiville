import Route from './Route'
import {Types} from '../utils/types'
import { searchJob } from '../utils/pe-api'

export default class RouteProfessions extends Route {
  constructor(params) {
    super({ ...params })
  }

  /**
   * @body {[string]} [code_rome]
   * @body {[string]} [insee]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      code_rome: Types.array().type(Types.string()).required(),
      insee: Types.array().type(Types.string()).required(),
    }),
  })
  async search(ctx) {
    const {code_rome: codeRome, insee} = this.body(ctx)

    const result = await searchJob({codeRome, insee, distance: 10})
    if(result) {
      this.sendOk(ctx, result.resultats)  
    } else {
      this.sendOk(ctx, [])
    }    
  }
}
