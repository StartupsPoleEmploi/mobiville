import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'embaucheDepartements',
    {
      codeRome: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      codeDepartement: {
        type: Sequelize.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      embauche: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tauxEmbauche: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      libelleRome: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      codePeriode: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      libellePeriode: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    },
    {
      timestamps: true,
      paranoid: false,
      underscored: true,
    }
  )

  Model.associate = function (models) {
    Model.hasMany(models.tensions, {
      foreignKey: 'rome',
      sourceKey: 'codeRome',
    })

    return models
  }

  return Model
}
