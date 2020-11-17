module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bassins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      code_commune_insee: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      reg_credoc: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reg: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dep: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      code_commune: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nom_com: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bassin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bassin_name: {
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

    await queryInterface.addIndex('bassins', ['code_commune_insee'], {})
    await queryInterface.addIndex('bassins', ['bassin_id'], {})
  },
  down: (queryInterface /*, Sequelize*/) => {
    return queryInterface.dropTable('bassins')
  },
}
