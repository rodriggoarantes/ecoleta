import { Router } from 'express';
import authMiddleware from './app/middleware/auth';

import StatusController from './app/controllers/StatusController';
import ItemController from './app/controllers/ItemController';
import PointController from './app/controllers/PointController';
import CityController from './app/controllers/CityController';
import StateController from './app/controllers/StateController';

const routes = Router();

routes.get(['', '/', '/status'], StatusController.status);

routes.get('/items', ItemController.index);

routes.get('/points', PointController.index);
routes.post('/points', PointController.create);
routes.get('/points/:id', PointController.show);

routes.get('/states', StateController.index);
routes.get('/cities', CityController.index);
routes.get('/cities/:id', CityController.show);
routes.get('/cities/states/:stateId', CityController.find);

routes.use(authMiddleware);

routes.get('/auth', StatusController.status);

export default routes;
