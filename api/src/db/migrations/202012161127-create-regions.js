module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('regions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      former_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      former_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      former_name_normalized: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      new_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      new_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      new_name_normalized: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      region: {
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
    return queryInterface.dropTable('regions')
  },
}
