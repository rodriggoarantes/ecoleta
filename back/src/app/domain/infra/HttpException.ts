class HttpException extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string, error?: Error) {
    super(message);
    this.status = status;
    this.message = message;
    this.stack = error?.stack;
  }
}

export default HttpException;
