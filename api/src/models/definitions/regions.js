import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'regions',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      population: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      superficie: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
      indexes: [{ fields: ['code'], unique: true }],
    }
  )

  Model.associate = function (models) {
    Model.hasMany(models.departements, {
      foreignKey: 'codeRegion',
      sourceKey: 'code',
    })
    Model.hasMany(models.cities, {
      foreignKey: 'code_region',
      sourceKey: 'code',
    })

    return models
  }

  return Model
}
