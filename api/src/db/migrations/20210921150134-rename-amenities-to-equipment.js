module.exports = {
  up: async (queryInterface) => {
    // remove paranoid mode columns
    await queryInterface.sequelize.query('TRUNCATE amenities') // FIXME
    await queryInterface.removeColumn('amenities', 'created_at')
    await queryInterface.removeColumn('amenities', 'updated_at')
    await queryInterface.removeColumn('amenities', 'deleted_at')
    await queryInterface.removeColumn('amenities', 'qualite_xy')
    await queryInterface.removeColumn('amenities', 'lambert_x')
    await queryInterface.removeColumn('amenities', 'lambert_y')
    await queryInterface.removeColumn('amenities', 'an')
    await queryInterface.removeColumn('amenities', 'dciris')
    await queryInterface.removeColumn('amenities', 'dep')

    await queryInterface.renameTable('amenities', 'equipments')
  },
  down: async (queryInterface) => {
    // doing the bare minimum as nothing was used before
    await queryInterface.renameTable('equipments', 'amenities')
  },
}
