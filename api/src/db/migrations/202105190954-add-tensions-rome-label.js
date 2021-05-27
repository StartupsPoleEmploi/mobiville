module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tensions', 'rome_label', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('tensions', 'rome_label')
  },
}
