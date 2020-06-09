import Knex from 'knex';

export const seed = async (knex: Knex) => {
  return knex('states')
    .del()
    .then(() => {
      return knex('states').insert([
        { id: 1, uf: 'GO' },
        { id: 2, uf: 'DF' },
        { id: 3, uf: 'RJ' },
        { id: 4, uf: 'SP' },
        { id: 5, uf: 'SC' },
      ]);
    });
};
