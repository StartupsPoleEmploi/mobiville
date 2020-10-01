module.exports = {
  port: process.env.PORT || 8080,
  database: {
    dialectOptions: {
      ssl: true,
    },
    pool: {
      max: 400,
      min: 20,
      acquire: 30000,
      idle: 10000,
    },
  },
};
