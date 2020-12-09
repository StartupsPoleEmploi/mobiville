module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stats', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      value_memo: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      session_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface /*, Sequelize*/) => {
    return queryInterface.dropTable('stats')
  },
}
