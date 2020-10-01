module.exports = {
  port: 3333,
  database: {
    url: process.env.DATABASE_URL || 'postgres://postgres:@127.0.0.1/gameutils_test',
    logging: null, // Outputting SQL to the console on execution of query
    dialectOptions: {
      ssl: false,
    },
  },
  databaseReplica: {
    url: process.env.DATABASE_REPLICA_URL || 'postgres://postgres:@127.0.0.1/gameutils_test',
    logging: null, // Outputting SQL to the console on execution of query
    dialectOptions: {
      ssl: false,
    },
  },
  jsonwebtoken: {
    private_key: 'MY-PRIVATE-KEY-USE-FOR-JWT-TO-CREATE-TOKEN-CONTAIN-USER-INFORMATIONS-TEST',
  },
};
