import Sequelize from 'sequelize'

// Note : there is a full text index
// on the ogr_label field

export default sequelizeInstance => {
  const Model = sequelizeInstance.define(
    'romeogrs',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_rome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      code_ogr: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ogr_label: {
        type: Sequelize.STRING(255),
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
      indexes: [{ fields: ['code_rome', 'code_ogr'] }],
    }
  )

  Model.associate = function (models) {
    Model.hasOne(models.romeCodes, { foreignKey: 'code', sourceKey: 'code_rome' })
    return models
  }

  return Model
}
