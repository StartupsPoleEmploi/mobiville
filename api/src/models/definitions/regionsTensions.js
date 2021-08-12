import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'regionsTensions',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      region_new_code: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      rome: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      criterion: {
        type: Sequelize.STRING(50),
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
      indexes: [
        {
          fields: ['region_new_code', 'rome', 'criterion'],
          unique: true,
        },
        {
          fields: ['rome'],
        },
      ],
    }
  )

  Model.associate = function (models) {
    Model.hasOne(models.regions, {
      foreignKey: 'new_code',
      sourceKey: 'region_new_code',
    })

    return models
  }

  return Model
}
