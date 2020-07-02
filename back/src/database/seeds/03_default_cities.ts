import Knex from 'knex';

export const seed = async (knex: Knex) => {
  return knex('cities')
    .del()
    .then(() => {
      return knex('cities').insert([
        { state_id: 1, name: 'Goiânia' },
        { state_id: 2, name: 'Brasilia' },
        { state_id: 3, name: 'Rio de Janeiro' },
        { state_id: 4, name: 'São Paulo' },
        { state_id: 5, name: 'Florianopolis' },
      ]);
    });
};
