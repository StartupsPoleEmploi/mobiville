import Route from './Route'
import { Types } from '../utils/types'
import { searchJob, infosTravail, infosTensionTravail } from '../utils/pe-api'
import { meanBy } from 'lodash'

const CODE_INSEE_LYON_FIRST_DISTRICT = '69381'
const CODE_INSEE_PARIS_FIRST_DISTRICT = '75101'
const CODE_INSEE_MARSEILLE_FIRST_DISTRICT = '13201'

const CODE_INSEE_LYON = '69123'
const CODE_INSEE_PARIS = '75056'
const CODE_INSEE_MARSEILLE = '13055'

// we need special matchings for Marseille, Paris and Lyon, since we cannot search them directly
// and need to input the insee code of a special district
const getInseeCodesForSearch = (inseeCodes) =>
  inseeCodes.map((inseeCode) => {
    if (inseeCode === CODE_INSEE_LYON) return CODE_INSEE_LYON_FIRST_DISTRICT
    if (inseeCode === CODE_INSEE_PARIS) return CODE_INSEE_PARIS_FIRST_DISTRICT
    if (inseeCode === CODE_INSEE_MARSEILLE)
      return CODE_INSEE_MARSEILLE_FIRST_DISTRICT

    return inseeCode
  })

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
    const { code_rome: codeRome, insee } = this.body(ctx)

    const result = await searchJob({
      codeRome,
      insee: getInseeCodesForSearch(insee),
      distance: 30,
    })
    if (result) {
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
    const { code_rome, insee } = this.body(ctx)

    //https://dares.travail-emploi.gouv.fr/donnees/la-nomenclature-des-familles-professionnelles-fap-2009

    const city = await this.model.findOne({
      where: { insee_com: insee },
      raw: true,
    })

    const pcs = await this.model.models.tensions.findOne({
      where: {
        rome: code_rome,
      },
      raw: true,
    })

    if (city && pcs) {
      const [infosResult, statsResult] = await Promise.all([
        infosTravail({
          codeProfession: pcs.pcs,
          codeRegion: city.code_dept,
          codeRome: code_rome,
        }),
        infosTensionTravail({
          codeRegion: city.code_dept,
          codeRome: code_rome,
        }),
      ])

      let tension = null
      if (statsResult && statsResult.result && statsResult.result.records) {
        const found = statsResult.result.records.find(
          (record) => record.AREA_TYPE_NAME === 'Département'
        )
        if (found) {
          tension = found.TENSION_RATIO || null
        }
      }

      if (infosResult && infosResult.result && infosResult.result.records) {
        const records = infosResult.result.records.map((r) => ({
          ...r,
          MINIMUM_SALARY: +r.MINIMUM_SALARY,
          MAXIMUM_SALARY: +r.MAXIMUM_SALARY,
        }))
        this.sendOk(ctx, {
          min: meanBy(records, 'MINIMUM_SALARY'),
          max: meanBy(records, 'MAXIMUM_SALARY'),
          tension,
        })
      } else {
        this.sendOk(ctx, null)
      }
    } else {
      this.sendOk(ctx, null)
    }
  }
}
