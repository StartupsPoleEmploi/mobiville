module.exports = {
  up: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.addIndex('amenities', ['depcom'], {})
    await queryInterface.addIndex('amenities', ['typequ'], {})
    await queryInterface.addIndex('amenities', ['depcom', 'typequ'])
  },
  down: async (/*queryInterface /*, Sequelize*/) => {},
}
