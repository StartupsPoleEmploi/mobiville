import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'departements',
    {
        code: {
            type: Sequelize.STRING(3),
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            unique: true,
          },
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          code_region: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          rent_m2: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          buy_m2: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          description: {
            type: Sequelize.STRING(512),
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
          hiring_rate: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          temp_winter: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          temp_spring: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          temp_summer: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          temp_autumn: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true
    }
  )

  Model.associate = function (models) {
    Model.hasMany(models.cities, {
      foreignKey: 'code_dept',
      sourceKey: 'code',
    })
    Model.hasOne(models.regions, {
      foreignKey: 'code',
      sourceKey: 'code_region',
    })
    
    return models
  }

  return Model
}
