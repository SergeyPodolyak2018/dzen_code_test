const { Model } = require('objection');
const db = require('../db/pgKnex.js');

Model.knex(db);

class ArticlesModel extends Model {
  static get tableName() {
    return 'articles';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'content'],

      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        created_time: { type: 'number' },
      },
    };
  }
}

module.exports = ArticlesModel;
