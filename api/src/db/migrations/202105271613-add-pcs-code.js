module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tensions', 'pcs', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('romeogrs', 'pcs')
  },
}
