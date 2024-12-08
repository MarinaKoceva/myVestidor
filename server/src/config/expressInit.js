import express from 'express';
import cors from 'cors';

import { authMiddleware } from '../middlewares/authMiddleware.js';

export default function expressInit(app) {
    app.use(express.json());
    app.use(cors({
        origin: '*', // Разрешава заявки от всички източници
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешени HTTP методи
        allowedHeaders: ['Content-Type', 'X-Authorization'], // Разрешени заглавия
      }));
      
    app.use(authMiddleware);
};