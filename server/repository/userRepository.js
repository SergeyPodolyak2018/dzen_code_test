const userRep = new Map();

const db = require('../dbModel/user.js');

const save = (userModel) => {
  return db
    .query()
    .insert({
      email: userModel.email,
      name: userModel.name,
      password: userModel.password,
    })
    .returning('id');
};

const get = (id) => {
  return db.query().select('name', 'email').where('id', '=', id);
};

const getByEmail = (email) => {
  return db.query().select('*').where('email', '=', email);
};

const getAll = () => {
  return db.query().select('*');
};

const deleteUser = (id) => {
  const idLoc = Number(id);

  return db.query().where('id', '=', idLoc).del();
};

module.exports = { save, get, getAll, getByEmail, deleteUser };
