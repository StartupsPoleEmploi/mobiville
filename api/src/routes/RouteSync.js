import { getAllBassins, getAllCities, getAllTensions, getAllRegions } from '../utils/api'
import Route from './Route'

export default class RouteSync extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })
  }

  @Route.Get()
  async syncCities(ctx) {
    const cities = await getAllCities()
    const status = await this.model.syncCities({cities})

    this.sendOk(ctx, status)
  }

  @Route.Get()
  async syncRegions(ctx) {
    const regions = await getAllRegions()
    const status = await this.models.regions.syncRegions({regions})

    this.sendOk(ctx, status)
  }

  @Route.Get()
  async syncProfessionInTension(ctx) {
    const bassins = await getAllBassins()
    const statusBassins = await this.models.bassins.sync({bassins})

    const tensions = await getAllTensions()
    const statusTensions = await this.models.tensions.syncTensions({tensions})

    this.sendOk(ctx, {tensions: statusTensions, bassins: statusBassins})
  }

}
