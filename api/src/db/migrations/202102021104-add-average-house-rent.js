module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cities', 'average_houserent', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('cities', 'average_houserent')
  },
}
