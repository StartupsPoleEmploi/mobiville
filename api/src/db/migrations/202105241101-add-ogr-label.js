module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('romeogrs', 'ogr_label', {
      type: Sequelize.STRING(255),
      allowNull: false,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('romeogrs', 'ogr_label')
  },
}
