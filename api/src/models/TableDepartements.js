import Sequelize from 'sequelize'
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
          attributes: ['nom_comm', 'insee_com', 'code_dept', 'population'],
          // attributes: { exclude: ['description'] },
          model: Model.models.cities,
          required: true,
          order: [['population', 'DESC']],
          limit: 10,
          where: {
            nom_comm: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('nom_comm')),
              'NOT LIKE',
              '%-ARRONDISSEMENT'
            ),
          },
        },
        {
          model: Model.models.regions,
          attributes: { exclude: ['description'] },
          include: [
            {
              model: Model.models.departements,
              attributes: {
                exclude: [
                  'description',
                  'buy_m2',
                  'rent_m2',
                  'superficie',
                  'population',
                  'hiring_rate',
                ],
              },
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
