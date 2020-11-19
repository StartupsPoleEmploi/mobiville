module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cities', 'distance_from_sea', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('cities', 'distance_from_sea')
  },
}
