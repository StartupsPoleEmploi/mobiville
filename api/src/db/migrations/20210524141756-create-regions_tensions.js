module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'regions_tensions',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        region_new_code: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        rome: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        criterion: {
          type: Sequelize.STRING(50),
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
      },
      {
        timestamps: true,
        paranoid: true,
        underscored: true,
        indexes: [
          {
            fields: ['region_new_code', 'rome', 'criterion'],
            unique: true
          },
          {
            fields: ['rome']
          }
        ],
      }
    )
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable('regions_tensions')
  },
}
