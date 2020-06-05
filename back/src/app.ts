import 'dotenv/config';

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import 'express-async-errors';

import routes from './routes';

export default class App {
  public server: express.Application;
  public port: number = 3333;

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
    this.server.use(
      async (
        err: express.ErrorRequestHandler,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        return res.status(500).json({
          message: 'Erro interno não esperado',
          error: JSON.stringify(err),
        });
      }
    );
  }

  private database() {}

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
