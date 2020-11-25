module.exports = {
  up: async (queryInterface/*, Sequelize*/) => {
    await queryInterface.bulkUpdate('cities', { distance_from_sea: null }, {})
  },
  down: async (/*queryInterface /*, Sequelize*/) => {
  },
}
