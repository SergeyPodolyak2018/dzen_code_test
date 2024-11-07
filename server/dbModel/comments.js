const { Model } = require('objection');
const db = require('../db/pgKnex.js');
const UserslModel = require('./user.js');
const FilesModel = require('./files.js');

Model.knex(db);

class CommentsModel extends Model {
  static get tableName() {
    return 'comments';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'article_id', 'user_id', 'path'],

      properties: {
        id: { type: 'number' },
        article_id: { type: 'number' },
        file_id: { type: ['integer', 'null'] },
        user_id: { type: 'number' },
        path: { type: 'string' },
        created_time: { type: 'string' },
      },
    };
  }
  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: UserslModel,
        join: {
          from: 'comments.user_id',
          to: 'users.id',
        },
      },
      files: {
        relation: Model.HasManyRelation,
        modelClass: FilesModel,
        join: {
          from: 'comments.file_id',
          to: 'files.id',
        },
      },
    };
  }
}

module.exports = CommentsModel;
