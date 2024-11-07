const commentService = require('../services/commentService.js');
const fileService = require('../services/fileService.js');
const MESSAGE = require('../helper/messages.js');
const { sanitizer } = require('../helper/checker.js');
const path = require('path');

const getAll = async (req, res) => {
  const {
    article_id,
    comment_id,
    limit = 20,
    page = 0,
    order_by = 'created_time',
    orderDirection = 'DESC',
  } = req.query;

  try {
    let commentpath = '0';
    if (Number(comment_id) !== 0) {
      const comment = await commentService.getCommentById(comment_id);

      if (comment && comment.length === 1) {
        commentpath = comment[0].path;
      }
    }

    const comments = await commentService.getAll(
      Number(article_id),
      Number(comment_id),
      commentpath,
      limit,
      page,
      order_by,
      orderDirection
    );
    const massage = MESSAGE.DATA(comments);
    res.status(massage.status).json(massage.data);
  } catch (err) {
    console.error(err);
    const massage = MESSAGE.ERROR(err);
    res.status(massage.status).json(massage.data);
  }
};

const postOne = async (req, res) => {
  try {
    const file = req.files?.file;
    const { article_id, comment_id, text } = req.body;
    const userId = res.locals?.decoded?.userId || 1; //TODO remove 1
    const commentId = Number(comment_id);
    const articleId = Number(article_id);
    const clearText = sanitizer(text);
    let commentpath = '0';
    let fileId = null;
    if (commentId !== 0) {
      const comment = await commentService.getCommentById(commentId);
      if (comment && comment.length === 1) {
        commentpath = comment[0].path + `.${comment[0].id}`;
      }
    }
    if (file) {
      const newFilename = Date.now() + '-' + file.name.replaceAll(' ', '');
      const newPath = '/uploads/' + newFilename;
      const uploadPath = path.join(
        __dirname,
        '../public/uploads/' + newFilename
      );
      file.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
      const fileSaveResult = await fileService.save(newPath);
      fileId = fileSaveResult.id;
    }

    const rezult = await commentService.saveComment(
      clearText,
      articleId,
      fileId,
      Number(userId),
      commentpath
    );
    const massage = MESSAGE.DATA(rezult);
    res.status(massage.status).json(massage.data);
  } catch (err) {
    console.error(err);
    const massage = MESSAGE.ERROR(err);
    res.status(massage.status).json(massage.data);
  }
};

const deleteOne = async (req, res) => {
  try {
    const client = await commentService.deleteClient(res.locals.id);
    const massage = MESSAGE.DELETE_SUCCESS(client);
    res.status(massage.status).json(massage.data);
  } catch (err) {
    console.error(err);
    const massage = MESSAGE.ERROR(err);
    res.status(massage.status).json(massage.data);
  }
};

module.exports = { getAll, postOne, deleteOne };
