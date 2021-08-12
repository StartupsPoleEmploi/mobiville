import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'amenities',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      reg: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      dep: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      depcom: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      dciris: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      an: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      typequ: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      lambert_x: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      lambert_y: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      qualite_xy: {
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
      deleted_at: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
      indexes: [{ fields: ['depcom', 'typequ'] }],
    }
  )

  Model.associate = function (models) {
    return models
  }

  return Model
}
