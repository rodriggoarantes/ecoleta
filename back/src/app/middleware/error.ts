import { NextFunction, Request, Response } from 'express';
import HttpException from './../domain/infra/HttpException';

const errorMiddleware = async (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error);

  const status = error.status || 500;
  const message = `Error: ${error.message || 'falha nao esperada'}`;
  return response.status(status).send({
    status,
    message,
  });
};

export default errorMiddleware;
