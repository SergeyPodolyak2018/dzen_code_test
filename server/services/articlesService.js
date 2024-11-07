const articleRep = require('../repository/articleRepository.js');

const ArticleModel = require('../models/atricle.js');

const getArticleById = async (id) => {
  return articleRep.getById(Number(id));
};
const getArticles = async () => {
  return articleRep.getAll();
};

const saveAticle = async (title, content) => {
  const article = new ArticleModel(title, content);
  const rez = await articleRep.save(article);
  return rez;
};

const deleteById = (id) => {
  return articleRep.deleteById(Number(id));
};

module.exports = {
  getArticleById,
  getArticles,
  saveAticle,
  deleteById,
};
