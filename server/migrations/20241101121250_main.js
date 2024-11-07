/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('articles', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table
        .timestamp('created_time', { useTz: false })
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    })
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table
        .timestamp('created_time', { useTz: false })
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    })
    .createTable('files', (table) => {
      table.increments('id').primary();
      table.string('path').notNullable();
      table
        .timestamp('created_time', { useTz: false })
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    })
    .raw('CREATE EXTENSION IF NOT EXISTS "ltree"')
    .createTable('comments', (table) => {
      table.increments('id').primary();
      table.string('text').notNullable();
      table.integer('article_id').notNullable();
      table.integer('file_id').unsigned();
      table.foreign('file_id').references('files.id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.specificType('path', 'ltree').notNullable();
      table
        .timestamp('created_time', { useTz: false })
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('comments')
    .dropTable('users')
    .dropTable('files')
    .dropTable('articles');
};
