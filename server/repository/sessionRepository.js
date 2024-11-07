const db = require('../db/redis.js');

const set = async (id, value) => {
  return db.set(id, value);
};

const setExpiried = async (id, value, time) => {
  db.set(id, value);
  return db.expire(id, time);
};

const get = async (id) => {
  return db.get(id);
};

const update = (id, value) => {};

module.exports = { set, get, setExpiried };
