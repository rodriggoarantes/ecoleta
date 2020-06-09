import { Request, Response } from 'express';

class StatusController {
  async status(_: Request, res: Response) {
    return res.json({
      id: 1,
      app: 'TS-DEV - API',
      time: new Date(),
      techs: ['typescript', 'nodejs', 'expressjs'],
    });
  }
}

export default new StatusController();
