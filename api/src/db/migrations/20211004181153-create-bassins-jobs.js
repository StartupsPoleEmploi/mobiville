module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bassins_jobs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      bassin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rome_id: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable('bassins_jobs')
  },
}
