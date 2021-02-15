module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cities', 'cache_living_environment', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('cities', 'cache_living_environment')
  },
}
