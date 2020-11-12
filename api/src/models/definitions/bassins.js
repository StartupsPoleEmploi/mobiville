import Sequelize from 'sequelize'

export default sequelizeInstance => {
  const Model = sequelizeInstance.define(
    'bassins',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_commune_insee: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reg_credoc: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reg: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dep: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      ccommune: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nomcom: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      be19: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nombe19: {
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
    }
  )

  Model.associate = function(models) {
    return models
  }

  return Model
}
