import { CRITERIONS } from '../constants/criterion'
import { Types } from '../utils/types'
import Route from './Route'
import { ALL_LIFE_CRITERIONS_LIST } from '../constants/lifeCriterions'
import { compact, orderBy } from 'lodash'

export default class RouteCities extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })
  }

  @Route.Get()
  async list(ctx) {
    this.sendOk(ctx, await this.model.findAll())
  }

  /**
   * @body {[number]} [code_region]
   * @body {[string]} [code_criterion]
   * @body {[string]} [code_rome]
   * @body {[number]} [from]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      code_region: Types.array(),
      code_criterion: Types.array(),
      code_rome: Types.array().type(Types.string()),
      from: Types.array().type(Types.string()),
      index: Types.number(),
      sortBy: Types.string(),
    }),
  })
  async search(ctx) {
    const {
      code_region: codeRegionTemp = [],
      code_criterion: codeCriterionTemp = [],
      code_rome: codeRome = [],
      from = [],
      index = 0,
      sortBy,
    } = this.body(ctx)
    const codeRegion = compact(codeRegionTemp) // temporary fix, as the front may send an array containing an empty string in code_region
    const codeCriterion = compact(codeCriterionTemp)

    if (index === 0) {
      this.model.models.stats.addStats({
        values: { codeRegion, codeCriterion, codeRome, from },
        session_id: ctx.session.id,
      })
    }
    let result = await this.model.search({
      codeRegion,
      codeCriterion,
      codeRome,
    })

    switch (sortBy) {
      case 'mer':
        result = orderBy(result, ['distance_from_sea'], ['asc'])
        break
      case 'montagne':
        result = orderBy(result, ['z_moyen'], ['desc'])
        break
      default:
        result = orderBy(result, ['population'], ['desc'])
        break
    }

    this.sendOk(ctx, {
      list: result.slice(index, index + 10),
      total: result.length,
      index,
    })
  }

  @Route.Get()
  async criterions(ctx) {
    const jobList = await this.model.models.tensions.fetchJobList()

    this.sendOk(ctx, {
      criterions: CRITERIONS,
      regions: await this.model.models.regionsTensions.fetch(),
      codeRomes: jobList.map((job) => ({
        key: job.rome,
        label: job.label,
      })),
    })
  }

  @Route.Get({
    path: 'load/:insee',
  })
  async loadCity(ctx) {
    const { insee } = ctx.params
    const details = await this.model.getCity({ insee })

    this.sendOk(ctx, details)
  }

  /**
   * @body {[number]} [latitude]
   * @body {[number]} [longitude]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      latitude: Types.number().required(),
      longitude: Types.number().required(),
    }),
  })
  async searchByLocation(ctx) {
    const { latitude, longitude } = this.body(ctx)

    const result = await this.model.searchByLocation({ latitude, longitude })

    this.sendOk(ctx, result)
  }

  /**
   * @body {[number]} [latitude]
   * @body {[number]} [longitude]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      id: Types.number(),
      name: Types.string(),
    }),
  })
  async searchByName(ctx) {
    const { name, id } = this.body(ctx)
    let result

    if (id) {
      result = await this.model.searchById({ id })
    } else {
      result = await this.model.searchByName({ name })
    }

    this.sendOk(ctx, result)
  }

  @Route.Get({
    path: 'tenement/:insee',
  })
  async tenementCity(ctx) {
    const { insee } = ctx.params
    const details = await this.model.getCity({ insee })

    this.sendOk(ctx, {
      nbSocialHousing:
        await this.model.models.socialhousings.getNbSocialHousing(details),
    })
  }

  @Route.Get({
    path: 'equipments/:insee',
  })
  async equipmentsCity(ctx) {
    const { insee } = ctx.params
    const cacheList = (await this.model.getCacheLivingEnvironment(insee)) || {}
    const list = JSON.parse(JSON.stringify(ALL_LIFE_CRITERIONS_LIST))

    for (let i = 0; i < list.length; i++) {
      for (let x = 0; x < list[i].tab.length; x++) {
        list[i].tab[x].total =
          cacheList[list[i].key + '-' + list[i].tab[x].label] || 0
      }
      list[i].tab = list[i].tab.filter((i) => i.total)
    }

    this.sendOk(ctx, list)
  }

  /**
   * @body {[string]} [label]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      label: Types.string().required(),
    }),
  })
  async searchBySkill(ctx) {
    const { label } = this.body(ctx)

    // Temporarily disable the search by skill to only
    // use the search by job title (OGR)
    const resultFromSkill = []
    // const resultFromSkill = await this.model.models.romeskills.searchByLabel(label)

    const resultFromOgr = await this.model.models.romeogrs.searchByLabel(label)

    this.sendOk(ctx, resultFromSkill.concat(resultFromOgr))
  }
}
