const { QueryTypes } = require('sequelize')
const { kebabCase } = require('lodash')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('helps', 'slug', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })

    const result = await queryInterface.sequelize.query(
      'SELECT id, title from helps',
      { type: QueryTypes.SELECT }
    )

    for (const row of result) {
      await queryInterface.sequelize.query(
        `UPDATE helps SET slug="${kebabCase(row.title)}" where id=${row.id}`
      )
    }

    // remove paranoid mode columns
    await queryInterface.sequelize.query(
      'DELETE FROM helps where deleted_at IS NOT NULL'
    )
    await queryInterface.removeColumn('helps', 'created_at')
    await queryInterface.removeColumn('helps', 'updated_at')
    await queryInterface.removeColumn('helps', 'deleted_at')

    await queryInterface.addIndex('helps', ['slug'], { unique: true })
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.removeColumn('helps', 'slug')
  },
}
