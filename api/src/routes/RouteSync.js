import { getAllBassins, getAllCities, getAllTensions, getAllRegions, getAmenitiesDatas, getRomeLabel } from '../utils/api'
import Route from './Route'

export default class RouteSync extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })

    setTimeout(() => { // super crade à changer lol
      this.syncDatas()
    }, 5000)
  }

  async syncDatas () {
    await this.model.models.romeogrs.syncRomeOgrs()
    await this.model.models.romeskills.syncRomeSkills()
    await this.model.models.tensions.syncDatas()
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
    for(let i = 0; i < tensions.length; i++) {
      tensions[i].rome_label = (await getRomeLabel(tensions[i].rome))
    }
    const statusTensions = await this.models.tensions.syncTensions({tensions})

    this.sendOk(ctx, {tensions: statusTensions, bassins: statusBassins})
  }

  @Route.Get()
  async syncAmenities(ctx) {
    const amenities = await getAmenitiesDatas()
    const statusAmenities = await this.models.amenities.sync({amenities})

    this.sendOk(ctx, {amenities: statusAmenities})
  }
}
