const articleService = require('../services/articlesService.js');
const MESSAGE = require('../helper/messages.js');

const getAll = async (req, res) => {
  try {
    const orders = await articleService.getArticles();

    const massage = MESSAGE.DATA(orders);
    res.status(massage.status).json(massage.data);
  } catch (err) {
    console.error(err);
    const massage = MESSAGE.ERROR('Internall error');
    res.status(massage.status).json(massage.data);
  }
};

const getOne = async (req, res) => {
  try {
    const article = await articleService.getArticleById(res.locals.id);
    const massage = MESSAGE.DATA(article);
    res.status(massage.status).json(massage.data);
  } catch (err) {
    console.error(err);
    const massage = MESSAGE.ERROR('Internall error');
    res.status(massage.status).json(massage.data);
  }
};

const postOne = async (req, res) => {
  try {
    const { title, content } = req.body;

    const rezult = await articleService.saveAticle(title, content);
    const massage = MESSAGE.ADD_DATA_SUCCESS(rezult);
    res.status(massage.status).json(massage.data);
  } catch (err) {
    console.error(err);
    const massage = MESSAGE.ERROR('Internall error');
    res.status(massage.status).json(massage.data);
  }
};

const deleteOne = async (req, res) => {
  try {
    const Order = await orderService.deleteOrder(res.locals.id);
    const massage = MESSAGE.DELETE_SUCCESS(Order);
    res.status(massage.status).json(massage.data);
  } catch (err) {
    console.error(err);
    const massage = MESSAGE.ERROR('Internall error');
    res.status(massage.status).json(massage.data);
  }
};

module.exports = { getAll, getOne, postOne, deleteOne };
