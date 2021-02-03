module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cities', 'average_houseselled', {
      type: Sequelize.FLOAT,
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('cities', 'average_houseselled')
  },
}
