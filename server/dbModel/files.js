const { Model } = require('objection');
const db = require('../db/pgKnex.js');

Model.knex(db);

class FilesModel extends Model {
  static get tableName() {
    return 'files';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['path'],

      properties: {
        id: { type: 'number' },
        path: { type: 'string' },
        created_time: { type: 'number' },
      },
    };
  }
}

module.exports = FilesModel;
