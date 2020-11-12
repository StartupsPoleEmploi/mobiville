import { getAllBassins, getAllCities, getAllTensions } from '../utils/api'
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
  async syncProfessionInTension(ctx) {
    const tensions = await getAllTensions()
    const statusTensions = await this.models.tensions.syncTensions({tensions})

    const bassins = await getAllBassins()
    const statusBassins = await this.models.bassins.sync({bassins})

    this.sendOk(ctx, {tensions: statusTensions, bassins: statusBassins})
  }

}
