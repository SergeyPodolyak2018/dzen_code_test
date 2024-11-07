const db = require('../dbModel/files.js');

const save = (fileModel) => {
  return db.query().insert(fileModel).returning('id');
};

const getById = (id) => {
  return db.query().select('*').where('id', '=', id);
};

module.exports = { save, getById };
