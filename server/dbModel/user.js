const { Model } = require('objection');
const db = require('../db/pgKnex.js');

Model.knex(db);

class UserslModel extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],

      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        name: { type: 'string' },
        password: { type: 'string' },
        created_time: { type: 'number' },
      },
    };
  }
}

module.exports = UserslModel;
