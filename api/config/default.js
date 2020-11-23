require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8080,
  EMPLOI_STORE_URL: process.env.EMPLOI_STORE_URL,
  ENTERPRISE_URL: process.env.ENTERPRISE_URL,
  EMPLOI_STORE_ID: process.env.EMPLOI_STORE_ID,
  EMPLOI_STORE_SECRET: process.env.EMPLOI_STORE_SECRET,
  database: {
    url: process.env.DATABASE_URL,
    dialect: 'mariadb',
  },
  weatherFile: (code) => `https://donneespubliques.meteofrance.fr/FichesClim/FICHECLIM_${(code + '').padStart(8, '0')}.data`,
}
