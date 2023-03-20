'use strict'

module.exports = {
  up: async (queryInterface/*, Sequelize*/) => {
    await queryInterface.dropTable('cities_jobs')
    await queryInterface.dropTable('rome_codes')
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cities_jobs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      insee_code: {
        type: Sequelize.STRING(10),
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

    await queryInterface.addIndex('cities_jobs', ['insee_code', 'rome_id'])
    await queryInterface.addIndex('cities_jobs', ['rome_id'])
    await queryInterface.addIndex('cities_jobs', ['number'])

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
}
