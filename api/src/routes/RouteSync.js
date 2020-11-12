import { getAllCities, getAllTensions } from '../utils/api'
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
    const status = await this.models.tensions.syncTensions({tensions})

    this.sendOk(ctx, status)
  }

}
