import Route from './Route'

export default class RouteHelps extends Route {
  constructor(params) {
    super({ ...params, model: 'helps' })
  }

  @Route.Get()
  async getPreviews(ctx) {
    const list = await this.model.findAll({
      attributes: [
        'id',
        'title',
        'goal',
        'who',
        'section',
        'situation',
        'count_vue',
        'slug',
        'logo',
        'type',
        'partner',
      ],
      raw: true,
    })
    this.sendOk(ctx, list)
  }

  @Route.Get({
    path: 'get-preview/:slug',
  })
  async getPreviewId(ctx) {
    const { slug } = ctx.params

    const element = await this.model.findOne({
      where: { slug },
    })

    if (element) {
      await element.update({ count_vue: element.dataValues.count_vue + 1 })
    }

    this.sendOk(ctx, element)
  }
}
