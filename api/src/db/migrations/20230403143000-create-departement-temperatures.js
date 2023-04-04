'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('departements', 'temp_winter', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })
    await queryInterface.addColumn('departements', 'temp_spring', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })
    await queryInterface.addColumn('departements', 'temp_summer', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })
    await queryInterface.addColumn('departements', 'temp_autumn', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })

    await queryInterface.removeColumn('cities', 'average_temperature')
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('departements', 'temp_winter')
    await queryInterface.removeColumn('departements', 'temp_spring')
    await queryInterface.removeColumn('departements', 'temp_summer')
    await queryInterface.removeColumn('departements', 'temp_autumn')

    await queryInterface.addColumn('cities', 'average_temperature', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })
  },
}
