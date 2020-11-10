import { getAllCities } from '../utils/api'
import Route from './Route'
import { log } from '../utils/log'

export default class RouteSync extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })
  }

  @Route.Get()
  async syncCities(ctx) {
    const cities = await getAllCities()
    log(cities.length, cities[0])
    const status = await this.model.syncCities({cities})

    this.sendOk(ctx, status)
  }
}
