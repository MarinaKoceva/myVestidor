import { Router } from 'express';
import authController from './controllers/authController.js';
import itemControler from './controllers/itemController.js';
import profileController from './controllers/profileController.js';

const routes = Router();

routes.use('/auth', authController);
routes.use('/item', itemControler);
routes.use('/profile', profileController);

export default routes;