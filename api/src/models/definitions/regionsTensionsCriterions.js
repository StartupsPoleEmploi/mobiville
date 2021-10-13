import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'regionsTensionsCriterions',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      json: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
    }
  )

  return Model
}
