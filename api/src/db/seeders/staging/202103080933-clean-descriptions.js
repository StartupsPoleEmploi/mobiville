module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    await models.cities.update({ description: null }, { where: {} })
  },
  down: (/*queryInterface , Sequelize*/) => {},
}
