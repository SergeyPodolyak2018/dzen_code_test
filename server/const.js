const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const ACCESS_TOKEN_SECRET = process.env['ACCESS_TOKEN_SECRET'];

const PORT = process.env['PORT'];
const BASE_URI = process.env['BASE_URI'] || '';
const DB_PORT = process.env['DB_PORT'];
const DB_USER = process.env['DB_USER'];
const DB_NAME = process.env['DB_NAME'];
const DB_HOST = process.env['DB_HOST'];
const DB_PASSWORD = process.env['DB_PASSWORD'];
const DB_CONNECTION_STRING = process.env['DB_CONNECTION_STRING'];

const REDIS_PASSWORD = process.env['REDIS_PASSWORD'];
const REDIS_USER = process.env['REDIS_USER'];
const REDIS_USER_PASSWORD = process.env['REDIS_USER_PASSWORD'];
const REDIS_PORT = process.env['REDIS_PORT'];
const REDIS_HOST = process.env['REDIS_HOST'];

module.exports = {
  PORT,
  BASE_URI,
  DB_PORT,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  DB_CONNECTION_STRING,
  DB_HOST,
  REDIS_PASSWORD,
  REDIS_USER,
  REDIS_USER_PASSWORD,
  REDIS_PORT,
  REDIS_HOST,
  ACCESS_TOKEN_SECRET,
};
