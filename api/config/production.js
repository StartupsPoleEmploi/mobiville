module.exports = {
  port: process.env.PORT || 8080,
  preloadSearch: true,
  database: {
    dialectOptions: {
      ssl: false,
    },
  },
}
