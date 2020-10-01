require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8080,
  EMPLOI_STORE_URL: process.env.EMPLOI_STORE_URL,
  ENTERPRISE_URL: process.env.ENTERPRISE_URL,
  EMPLOI_STORE_ID: process.env.EMPLOI_STORE_ID,
  EMPLOI_STORE_SECRET: process.env.EMPLOI_STORE_SECRET,
  API_CITIES: process.env.API_CITIES,
  database: {
    url: process.env.DATABASE_URL || 'postgres://postgres:@127.0.0.1/gameutils',
    logging: null, // Outputting SQL to the console on execution of query
  },
};
