import { Request, Response } from 'express';

import locationService from './../domain/location/LocationService';

class StateController {
  async index(_: Request, res: Response) {
    return res.json(await locationService.listStates());
  }
}

export default new StateController();
