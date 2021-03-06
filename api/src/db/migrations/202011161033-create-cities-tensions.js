module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tensions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      libfap: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      rome: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      fap: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bassin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bassin_lib: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      lib_rome: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      defm: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      dee: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      oee_nosais: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ind_t: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      selec_offre: {
        type: Sequelize.INTEGER,
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

    await queryInterface.addIndex('tensions', ['bassin_id'], {})
  },
  down: (queryInterface /*, Sequelize*/) => {
    return queryInterface.dropTable('tensions')
  },
}
