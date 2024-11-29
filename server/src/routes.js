import { Router } from 'express';
import authController from './controllers/authController.js';
import itemControler from './controllers/itemController.js';

const routes = Router();

routes.use('/Please change here!!!', authController);
routes.use('/Please change here!!!', itemControler);

export default routes;