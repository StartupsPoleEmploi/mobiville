module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'rome_codes',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        code: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        label: {
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
      },
      {
        timestamps: true,
        underscored: true,
        indexes: [
          {
            fields: ['code'],
            unique: true,
          },
        ],
      }
    )
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable('rome_codes')
  },
}
