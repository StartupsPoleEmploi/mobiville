import { wikipediaDepartementDetails } from '../utils/api'

export default (sequelizeInstance, Model) => {
  Model.sync = async ({ departements }) => {
    await Model.destroy({ truncate: true })
    await Model.bulkCreate(departements)
  }

  Model.getDepartement = async ({ code }) => {
    const departement = await Model.findOne({
      where: { code: code },
      include: [
        {
          // attributes: ['name'],
          model: Model.models.cities,
          required: true,
          order: [['population', 'DESC']],
          limit: 10,
        },
        {
          model: Model.models.regions,
          include: [
            {
              model: Model.models.departements,
            },
          ],
        },
      ],
    })

    return departement
  }
  Model.getAllDepartement = async () => {
    return (await Model.findAll()).map((e) => {
      return {
        code: e.code,
        name: e.name,
      }
    })
  }

  Model.syncDepartementData = async (departement) => {
    const description = await wikipediaDepartementDetails(departement.name)
    await Model.update(
      {
        description,
      },
      {
        where: {
          code: departement.code,
        },
      }
    )
  }

  return Model
}
