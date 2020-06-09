import 'dotenv/config';

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import 'express-async-errors';

import errorHandler from './app/middleware/error';
import routes from './routes';

export default class App {
  private server: express.Application;
  private readonly port = process.env.PORT || '3333';

  constructor() {
    dotenv.config();
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.database();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());

    this.server.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  private routes() {
    this.server.use(routes);
  }

  private exceptionHandler() {
    this.server.use(errorHandler);
  }

  private database() {}

  public listen(): App {
    this.server.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
    return this;
  }

  public getServer(): express.Application {
    return this.server;
  }
}
