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
      former_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      former_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      former_name_normalized: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      new_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      new_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      new_name_normalized: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      region: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      average_delay_obtain_social_housing: {
        type: Sequelize.INTEGER,
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
      indexes: [{ fields: ['former_code'] }, { fields: ['new_code'] }],
    }
  )

  Model.associate = function (models) {
    return models
  }

  return Model
}
