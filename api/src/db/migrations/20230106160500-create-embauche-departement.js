'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('embauche_departements', {
      code_departement: {
        type: Sequelize.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      code_rome: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      embauche: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      taux_embauche: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      libelle_rome: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      code_periode: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      libelle_periode: {
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
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable('embauche_departement')
  },
}
