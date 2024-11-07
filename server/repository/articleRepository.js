const db = require('../dbModel/articles.js');

const save = (model) => {
  return db
    .query()
    .insert({
      title: model.title,
      content: model.content,
    })
    .returning('id', 'title', 'content', 'created_time');
};

const getById = (id) => {
  return db.query().select('*').where('id', '=', id);
};

const getAll = () => {
  return db
    .query()
    .select('id', 'title', 'created_time')
    .orderBy('created_time', 'DESC');
};

const deleteById = (id) => {
  const idLoc = Number(id);
  return db.query().where('id', '=', idLoc).del();
};

module.exports = { save, getAll, getById, deleteById };
