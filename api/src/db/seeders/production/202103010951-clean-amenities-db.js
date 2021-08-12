module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    await models.amenities.destroy({
      where: {},
      force: true,
    })
  },
  down: async (/*queryInterface /*, Sequelize*/) => {},
}
