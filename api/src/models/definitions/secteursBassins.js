import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'secteursBassins',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_bassin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      demandeurs_emploi: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      secteur_libelle: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
    }
  )

  Model.associate = function (models) {
    Model.hasOne(models.bassins, {
      foreignKey: 'bassin_id',
      sourceKey: 'code_bassin',
    })
    
    return models
  }

  return Model
}
