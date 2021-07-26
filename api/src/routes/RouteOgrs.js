import Route from './Route'

export default class RouteOgrs extends Route {
  constructor(params) {
    super({ ...params, model: 'romeogrs' })
  }

  @Route.Get({ path: '/' })
  async get(ctx) {
    const result = await this.model.findAll({
      attributes: ['code_rome', 'ogr_label'],
      include: {
        attributes: ['label'],
        model: this.model.models.romeCodes,
      },
    })

    this.sendOk(ctx, result.map(row => ({
      rome: row.code_rome,
      romeLabel: row.romeCode.label,
      ogrLabel: row.ogr_label,
    })))
  }
}
