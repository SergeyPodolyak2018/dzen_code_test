const db = require('../dbModel/comments.js');

const save = (userModel) => {
  return db.query().insert(userModel).returning('id');
};

const getById = (id) => {
  return db.query().select('*').where('id', '=', id);
};

const getAll = (article_id, path, limit, offset, ascdesc, orderBy) => {
  const orderByMap = {
    created_time: 'c.created_time',
    user_name: 'users.name',
    user_email: 'users.email',
  };

  return db
    .query()
    .from('comments AS c')
    .select(
      'c.id',
      'c.text',
      'c.article_id',
      'c.user_id',
      'c.file_id',
      'c.path',
      'files.path as file_path',
      'users.name as user_name',
      'c.created_time',
      'users.email as user_email',
      // 'x.childrens',
      db.raw("(CONCAT(c.path,'.',c.id)) as child_path")
      // db.raw(
      //   "(SELECT count(*) from comments as o WHERE o.path ~ (CONCAT(c.path,'.',c.id))) as childs_qantity"
      // )
    )

    .leftJoin('users', 'users.id', '=', 'c.user_id')
    .leftJoin('files', 'files.id', '=', 'c.file_id')
    .where('c.article_id', '=', article_id)
    .andWhere('c.path', '~', path)
    .orderBy(orderByMap[orderBy], ascdesc)
    .limit(limit, { skipBinding: !!limit })
    .offset(offset, { skipBinding: !!offset });
};

const deleteById = (id) => {
  const idLoc = Number(id);
  return db.query().where('id', '=', idLoc).del();
};

module.exports = { save, getAll, getById, deleteById };
//WHERE "path" ~ CONCAT("comments"."path",".","comments"."id")
//CONCAT(c.path,'.',c.id)
