import path from 'path';
import knex from 'knex';

export const config = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
};

const connection = knex(config);
export default connection;
