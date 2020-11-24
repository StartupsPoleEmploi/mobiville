module.exports = {
  nb_sync_cities_same_time: 5,
  database: {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: false,
    },
  },
}
