module.exports = {
  database: {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: false,
    },
  },
}
