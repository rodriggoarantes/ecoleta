import Knex from 'knex';

const TABLENAME = 'points_items';

export const up = async (knex: Knex) => {
  return knex.schema.createTable(TABLENAME, (table) => {
    table.integer('id').primary();
    table.integer('point_id').notNullable().references('id').inTable('points');
    table.integer('item_id').notNullable().references('id').inTable('items');
  });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable(TABLENAME);
};
