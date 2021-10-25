module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('helps', 'logo', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
    await queryInterface.addColumn('helps', 'type', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
    await queryInterface.addColumn('helps', 'partner', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
    await queryInterface.renameColumn('helps', 'situtation', 'situation')
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('helps', 'logo')
    await queryInterface.removeColumn('helps', 'type')
    await queryInterface.removeColumn('helps', 'partner')
    await queryInterface.renameColumn('helps', 'situation', 'situtation')
  },
}
