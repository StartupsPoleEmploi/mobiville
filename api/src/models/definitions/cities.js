import Sequelize from 'sequelize'

export default sequelizeInstance => {
  const Model = sequelizeInstance.define(
    'cities',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_comm: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nom_dept: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      statut: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      z_moyen: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nom_region: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      code_reg: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      insee_com: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      code_dept: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      geo_point_2d_x: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      geo_point_2d_y: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      id_geofla: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      code_cant: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      superficie: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nom_comm: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      code_arr: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      population: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      distance_from_sea: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      average_temperature: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      average_houseselled: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      city_house_tension: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      average_houserent: {
        type: Sequelize.FLOAT,
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
      deleted_at: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  )

  Model.associate = function(models) {
    Model.hasOne(models.bassins, { foreignKey: 'code_commune_insee', sourceKey: 'insee_com' })
    Model.hasOne(models.regions, { foreignKey: 'former_code', sourceKey: 'code_reg' })

    return models
  }

  return Model
}
