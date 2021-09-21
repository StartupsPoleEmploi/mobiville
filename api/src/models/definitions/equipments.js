import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'equipments',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      depcom: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      typequ: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
      indexes: [{ fields: ['depcom', 'typequ'] }],
    }
  )

  Model.associate = function (models) {
    return models
  }

  return Model
}
