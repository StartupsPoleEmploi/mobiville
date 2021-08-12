module.exports = {
  up: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.addIndex('regions', ['former_code'], {})
    await queryInterface.addIndex('regions', ['new_code'], {})

    await queryInterface.addIndex('socialhousings', ['code_reg'], {})

    await queryInterface.addIndex('tensions', ['rome'], {})
  },
  down: async (/*queryInterface /*, Sequelize*/) => {},
}
