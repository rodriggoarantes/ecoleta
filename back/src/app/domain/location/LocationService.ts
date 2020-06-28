import knex from './../../../database/connection';
import City from './City';
import State from './State';

class LocationService {
  async findCityById(id: number) {
    return knex.from<City>('cities').where('id', id).first();
  }

  async listCities(): Promise<Array<City>> {
    return knex.from<City>('cities').select();
  }

  async listCitiesByState(stateId: number): Promise<Array<City>> {
    return knex
      .from<City>('cities')
      .innerJoin('states', 'cities.state_id', '=', 'states.id')
      .where('cities.state_id', stateId)
      .select();
  }

  async findByNames(city: string, uf: string): Promise<City> {
    return knex
      .from<City>('cities')
      .innerJoin('states', 'cities.state_id', '=', 'states.id')
      .where('cities.name', 'like', city)
      .where('states.uf', 'like', uf)
      .select()
      .first();
  }

  async findStateById(id: number) {
    return knex.from<State>('states').where('id', id).first();
  }

  async listStates(): Promise<Array<State>> {
    return knex.from<State>('states').select();
  }
}

export default new LocationService();
