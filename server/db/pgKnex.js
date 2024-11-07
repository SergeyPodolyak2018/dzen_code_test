const {
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  DB_CONNECTION_STRING,
  DB_PORT,
  DB_HOST,
} = require('../const.js');

const pg = require('knex')({
  client: 'pg',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
  },
  searchPath: ['knex', 'public'],
});

module.exports = pg;
