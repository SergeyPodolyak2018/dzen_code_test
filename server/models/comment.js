class CommentModel {
  article_id;
  file_id;
  user_id;
  path;
  text;
  constructor(text, article_id, file_id, user_id, path) {
    this.text = text;
    this.article_id = article_id;
    this.file_id = file_id;
    this.user_id = user_id;
    this.path = path;
  }
}

module.exports = CommentModel;
