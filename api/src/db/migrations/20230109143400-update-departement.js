'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('departements', 'description', {
      type: Sequelize.STRING(4096),
      allowNull: true,
    })
    await queryInterface.addColumn('departements', 'population', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.addColumn('departements', 'superficie', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.addColumn('departements', 'hiring_rate', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('departements', 'description')
    await queryInterface.removeColumn('departements', 'population')
    await queryInterface.removeColumn('departements', 'superficie')
    await queryInterface.removeColumn('departements', 'hiring_rate')
  },
}
