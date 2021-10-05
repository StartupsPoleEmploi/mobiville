import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'bassinsJobs',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      bassin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rome_id: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
      indexes: [
        { fields: ['bassin_id', 'rome_id'] },
        { fields: ['rome_id'] },
        { fields: ['number'] },
      ],
    }
  )

  Model.associate = function (models) {
    Model.hasOne(models.bassins, {
      foreignKey: 'bassin_id',
      sourceKey: 'bassin_id',
    })

    return models
  }

  return Model
}
