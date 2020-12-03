module.exports = {
  preloadSearch: true,
  database: {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: false,
    },
  },
}
