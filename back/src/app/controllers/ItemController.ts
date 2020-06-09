import { Request, Response } from 'express';

import itemService from './../domain/items/ItemService';

class ItemController {
  async index(_: Request, res: Response) {
    const list = await itemService.list();
    return res.json(list);
  }
}

export default new ItemController();
