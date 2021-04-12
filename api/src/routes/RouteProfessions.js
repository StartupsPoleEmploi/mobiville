import Route from './Route'
import {Types} from '../utils/types'
import { searchJob, infosTravail } from '../utils/pe-api'
import { meanBy } from 'lodash'

export default class RouteProfessions extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })
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

    const result = await searchJob({codeRome, insee, distance: 30})
    if(result) {
      this.sendOk(ctx, result.resultats)  
    } else {
      this.sendOk(ctx, [])
    }    
  }

  /**
   * @body {string} code_rome
   * @body {string} insee
   */
  @Route.Post({
    bodyType: Types.object().keys({
      code_rome: Types.string().required(),
      insee: Types.string().required(),
    }),
  })
  async infosTravail(ctx) {
    const {code_rome: codeRome, insee} = this.body(ctx)

    //https://dares.travail-emploi.gouv.fr/donnees/la-nomenclature-des-familles-professionnelles-fap-2009

    const city = (await this.model.findOne({
      where: {insee_com: insee},
      raw: true,
    }))

    let codeProfession
    switch(codeRome) {
    case 'J1501':
      codeProfession = '526d'
      break
    case 'I1401':
      codeProfession = '478b'
      break
    }

    if(city && codeProfession) {
      const result = await infosTravail({codeProfession, codeRegion: city.code_dept})
      if(result && result.result && result.result.records) {

        const records = result.result.records.map(r => ({...r, MINIMUM_SALARY: +r.MINIMUM_SALARY, MAXIMUM_SALARY: +r.MAXIMUM_SALARY}))
        this.sendOk(ctx, {min: meanBy(records, 'MINIMUM_SALARY'), max: meanBy(records, 'MAXIMUM_SALARY')})  
      } else {
        this.sendOk(ctx, null)
      } 
    } else {
      this.sendOk(ctx, null)
    }   
  }
}
