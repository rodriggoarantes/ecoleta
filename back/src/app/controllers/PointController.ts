import { Request, Response } from 'express';

import knex from './../../database/connection';

import itemService from './../domain/items/ItemService';
import locationService from './../domain/location/LocationService';

import Point from './../domain/points/Point';
import City from './../domain/location/City';
import State from '../domain/location/State';

class PointController {
  async index(req: Request, res: Response) {
    const { city_id, city, uf, items } = req.query;

    let cityObj: City = <City>{};
    if (city_id) {
      cityObj =
        (await locationService.findCityById(Number(city_id))) || <City>{};
    }
    if (!cityObj.id) {
      cityObj = await locationService.findByNames(String(city), String(uf));
    }

    const itemsList: Array<number> =
      items && items.length
        ? String(items)
            .trim()
            .split(',')
            .map((i) => Number(i.trim()))
        : [];

    const points: Array<Point> = await knex
      .from<Point>('points')
      .innerJoin('points_items', 'points.id', '=', 'points_items.point_id')
      .where((builder) => {
        if (itemsList && itemsList.length > 0) {
          builder.whereIn('points_items.item_id', itemsList);
        }
        if (cityObj && cityObj.id) {
          builder.where('points.city', cityObj.id);
        }
        builder.whereNotNull('points.id');
      })
      .distinct()
      .select('points.*');

    return res.json(points);
  }

  async create(req: Request, res: Response) {
    const { items, ...point } = req.body;
    const pointObj: Point = { ...point, image: 'fake.png' };

    const trx = await knex.transaction();

    const result = await trx('points')
      .insert(pointObj)
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
    const point_id = (result && result[0]) || 0;

    const itemIds: Array<number> = items || [];
    if (itemIds && itemIds.length) {
      const pointItems = itemIds.map((item_id: number) => {
        return { item_id, point_id };
      });
      await trx('points_items').insert(pointItems);
    }
    await trx.commit();

    return res.json({ ...pointObj, id: point_id });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const point: Point = await knex('points').where('id', id).first();

    if (!point || !point.id) {
      return res
        .status(400)
        .json({ message: `Ponto nao encontrado para id ${id}`, error: '404' });
    }

    const items = await itemService.listByPoint(point.id);
    const city = (await locationService.findCityById(point.city)) || <City>{};
    const state = await locationService.findStateById(city.state_id);

    return res.json({ point: { ...point, city, state }, items });
  }
}

export default new PointController();
