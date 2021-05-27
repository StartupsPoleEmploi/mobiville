'use strict';

const fields = [
"code_comm",
"nom_dept",
"statut",
"z_moyen",
"nom_region",
"code_reg",
"code_dept",
"geo_point_2d_x",
"geo_point_2d_y",
"postal_code",
"id_geofla",
"code_cant",
"superficie",
"code_arr",
"created_at",
"updated_at",
"deleted_at",
"distance_from_sea",
"average_temperature",
"description",
"city_house_tension",
"average_houserent",
"cache_living_environment",
"photo",
"average_houseselled",
].join(", ")

const POPULATION_MARSEILLE = 861.6
const POPULATION_LYON = 513.2
const POPULATION_PARIS = 2161

const CODE_INSEE_LYON_FIRST_DISTRICT = "69381"
const CODE_INSEE_PARIS_FIRST_DISTRICT = "75101"
const CODE_INSEE_MARSEILLE_FIRST_DISTRICT = "13201"

const CODE_INSEE_LYON = "69123"
const CODE_INSEE_PARIS = "75056"
const CODE_INSEE_MARSEILLE = "13055"

module.exports = {
  up: async (queryInterface, Sequelize) => 
    Promise.all([
      // Add major cities missing
      queryInterface.sequelize.query(`INSERT INTO cities (${fields}, nom_comm, population, insee_com) (SELECT ${fields}, "LYON", ${POPULATION_LYON}, "${CODE_INSEE_LYON}" from cities WHERE insee_com = "${CODE_INSEE_LYON_FIRST_DISTRICT}" LIMIT 1)`),
      queryInterface.sequelize.query(`INSERT INTO cities (${fields}, nom_comm, population, insee_com) (SELECT ${fields}, "PARIS", ${POPULATION_PARIS}, "${CODE_INSEE_PARIS}" from cities WHERE insee_com = "${CODE_INSEE_PARIS_FIRST_DISTRICT}" LIMIT 1)`),
      queryInterface.sequelize.query(`INSERT INTO cities (${fields}, nom_comm, population, insee_com) (SELECT ${fields}, "MARSEILLE", ${POPULATION_MARSEILLE}, "${CODE_INSEE_MARSEILLE}" from cities WHERE insee_com = "${CODE_INSEE_MARSEILLE_FIRST_DISTRICT}" LIMIT 1)`),

      queryInterface.sequelize.query(`UPDATE cities SET population = ${POPULATION_MARSEILLE} WHERE nom_comm LIKE "Marseille%arrondissement%"`),
      queryInterface.sequelize.query(`UPDATE cities SET population = ${POPULATION_LYON} WHERE nom_comm LIKE "Lyon%arrondissement%"`),
      queryInterface.sequelize.query(`UPDATE cities SET population = ${POPULATION_PARIS} WHERE nom_comm LIKE "Paris%arrondissement%"`),
    ]),

  down: async (queryInterface, Sequelize) => {
  }
};
