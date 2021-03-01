import { getAllBassins, getAllCities, getAllTensions, getAllRegions, getAmenitiesDatas } from '../utils/api'
import Route from './Route'

export default class RouteSync extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })

    try {
      this.autoSync()
    } catch(err) {
      console.log(err)
    }
  }

  async autoSync() {
    const countAmenities = await this.models.amenities.count()
    if(countAmenities === 0) {
      const amenities = await getAmenitiesDatas()
      await this.models.amenities.sync({amenities})
    }
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
