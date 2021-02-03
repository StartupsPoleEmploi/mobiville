module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cities', 'city_house_tension', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('cities', 'city_house_tension')
  },
}
