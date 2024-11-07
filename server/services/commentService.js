const commentRepository = require('../repository/commentsRepository.js');

const CommentModel = require('../models/comment.js');

const getCommentById = async (id) => {
  return commentRepository.getById(id);
};

const saveComment = async (text, article_id, file_id, user_id, path) => {
  const comment = new CommentModel(text, article_id, file_id, user_id, path);
  console.dir(comment);
  const rez = await commentRepository.save(comment);
  return rez;
};

const getAll = (
  article_id,
  comment_id,
  comment_path,
  limit,
  page,
  order,
  orderDirection
) => {
  let parrent = comment_path;
  if (comment_id !== 0) {
    parrent = parrent + `.${comment_id}`;
  }
  const offset = limit * page;
  const ascdesc = orderDirection === 'ASC' ? 'ASC' : 'DESC';
  const orderPosiblevalues = ['created_time', 'user_name', 'user_email'];
  const orderBy = orderPosiblevalues.includes(order) ? order : 'created_time';
  return commentRepository.getAll(
    article_id,
    parrent,
    limit,
    offset,
    ascdesc,
    orderBy
  );
};

const deleteComment = (id) => {
  return commentRepository.deleteById(id);
};

module.exports = { getCommentById, saveComment, getAll, deleteComment };
