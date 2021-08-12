import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'romeskills',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_rome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      skill_label: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
      deleted_at: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
      indexes: [{ fields: ['code_rome'] }],
    }
  )

  Model.associate = function (models) {
    Model.hasOne(models.tensions, {
      foreignKey: 'rome',
      sourceKey: 'code_rome',
    })
    Model.hasOne(models.romeCodes, {
      foreignKey: 'code',
      sourceKey: 'code_rome',
    })

    return models
  }

  return Model
}
