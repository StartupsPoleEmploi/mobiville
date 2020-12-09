module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('stats', 'type', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('stats', 'type')
  },
}
