import { Op } from 'sequelize'

export default (sequelizeInstance, Model) => {
  Model.getTopEmbauche = async ({ codeDepartement, maxItems }) => {
    return await Model.findAll({
      order: [['embauche', 'DESC']],
      where: {
        codeDepartement: {
          [Op.eq]: codeDepartement,
        },
      },
      limit: maxItems,
    })
  }

  Model.updateEmbauche = async ({
    codeDepartement,
    codeRome,
    libelleRome,
    codePeriode,
    libellePeriode,
    embauche,
    tauxEmbauche,
  }) => {
    return await Model.upsert({
      codeDepartement,
      codeRome,
      libelleRome,
      codePeriode,
      libellePeriode,
      embauche,
      tauxEmbauche,
    })
  }

  return Model
}
