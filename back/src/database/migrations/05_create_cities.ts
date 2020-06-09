import Knex from 'knex';

const TABLE_NAME = 'cities';

export const up = async (knex: Knex) => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('state_id').notNullable().references('id').inTable('states');
  });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
