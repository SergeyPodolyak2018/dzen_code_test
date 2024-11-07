const { createClient } = require('redis');
const {
  REDIS_PORT,
  REDIS_USER,
  REDIS_HOST,
  REDIS_USER_PASSWORD,
} = require('../const.js');

const client = createClient({
  url: `redis://${REDIS_USER}:${REDIS_USER_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

module.exports = client;
