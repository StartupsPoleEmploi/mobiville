/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'ALTER TABLE romeogrs ADD FULLTEXT INDEX index_fulltext (ogr_label)'
    )
  },
  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable('DROP INDEX `index_fulltext` ON romeogrs;')
  },
}
