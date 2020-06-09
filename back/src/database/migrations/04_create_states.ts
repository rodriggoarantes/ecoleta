import Knex from 'knex';

const TABLE_NAME = 'states';

export const up = async (knex: Knex) => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('uf', 2).notNullable();
  });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
