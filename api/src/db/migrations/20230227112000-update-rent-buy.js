'use strict'

module.exports = {
  up: async (queryInterface/*, Sequelize*/) => {
    await queryInterface.renameColumn('departements', 'rent_t2', 'rent_m2')
    await queryInterface.renameColumn('departements', 'rent_t4', 'buy_m2')

    await queryInterface.renameColumn('cities', 'average_houserent', 'rent_m2')
    await queryInterface.renameColumn('cities', 'average_houseselled', 'buy_m2',)
  },
  down: async (queryInterface/*, Sequelize*/) => {
    await queryInterface.renameColumn('departements', 'rent_m2', 'rent_t2')
    await queryInterface.renameColumn('departements', 'buy_m2', 'rent_t4')
    
    await queryInterface.renameColumn('cities', 'rent_m2', 'average_houserent')
    await queryInterface.renameColumn('cities', 'buy_m2', 'average_houseselled',)
  },
}
