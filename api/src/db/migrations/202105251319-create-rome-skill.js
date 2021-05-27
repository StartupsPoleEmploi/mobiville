module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('romeskills', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_rome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      skill_label: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
  down: async (queryInterface /*, Sequelize*/) => {
    return queryInterface.dropTable('romeskills')
  },
}
