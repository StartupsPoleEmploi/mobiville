module.exports = {
  preloadSearch: false,
  database: {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: false,
    },
  },
}
