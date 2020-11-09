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
    log(cities.length, cities[0], cities[1], cities[2], cities[3], cities[4])
    // await this.model.syncCities({cities: cities.map(c => (c.fields))})

    this.sendOk(ctx, 'Done')
  }
}
