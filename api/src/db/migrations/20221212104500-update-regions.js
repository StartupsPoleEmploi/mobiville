'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('new_regions', 'regions')
    await queryInterface.renameColumn('regions', 'name_normalized', 'slug')
    await queryInterface.removeColumn('regions', 'average_delay_obtain_social_housing')
    await queryInterface.addColumn('regions', 'population', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.addColumn('regions', 'superficie', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.addColumn('regions', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    })

    await queryInterface.addColumn('departements', 'code_region', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })

    await queryInterface.renameColumn('cities', 'new_code_region', 'code_region')
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('regions', 'new_regions')
    await queryInterface.renameColumn('regions', 'slug', 'name_normalized')
    await queryInterface.addColumn('regions', 'average_delay_obtain_social_housing', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.removeColumn('regions', 'population')
    await queryInterface.removeColumn('regions', 'superficie')
    await queryInterface.removeColumn('regions', 'description')

    await queryInterface.removeColumn('departements', 'code_region')

    await queryInterface.renameColumn('cities', 'code_region', 'new_code_region')
  },
}
