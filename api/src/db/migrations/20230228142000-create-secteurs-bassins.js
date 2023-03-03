'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('secteurs_bassins', {
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
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable('secteurs_bassins')
  },
}
