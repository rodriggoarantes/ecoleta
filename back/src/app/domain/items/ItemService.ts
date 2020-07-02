import knex from './../../../database/connection';
import Item from './Item';

class ItemService {
  private readonly urlApp: string =
    process.env.APP_URL || 'http://localhost:3333';

  async list(): Promise<Array<Item>> {
    const items: Array<Item> = await knex('items').select('*');

    return items.map((item) => {
      return <Item>{
        ...item,
        url: `${this.urlApp}/uploads/${item.image}`,
      };
    });
  }

  async listByPoint(pointId: number): Promise<Array<Item>> {
    return knex('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', pointId);
  }
}

export default new ItemService();
