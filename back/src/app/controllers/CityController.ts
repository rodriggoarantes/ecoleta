import { Request, Response } from 'express';

import locationService from './../domain/location/LocationService';

class CityController {
  async index(_: Request, res: Response) {
    const list = await locationService.listCities();
    return res.json(list);
  }

  async find(req: Request, res: Response) {
    const { stateId } = req.params;
    const list = await locationService.listCitiesByState(Number(stateId));
    return res.json(list);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    return res.json(await locationService.findById(Number(id)));
  }
}

export default new CityController();
