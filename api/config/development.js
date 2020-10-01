module.exports = {
  database: {
    url: process.env.DATABASE_URL || 'postgres://postgres:@127.0.0.1/gameutils',
    logging: console.log, // Outputting SQL to the console on execution of query
    dialectOptions: {
      ssl: false,
    },
  },
};
