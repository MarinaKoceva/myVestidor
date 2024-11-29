import express from 'express';
import cors from 'cors';

import { authMiddleware } from '../middlewares/authMiddleware.js';

export default function expressInit(app) {
    app.use(express.json());
    app.use(cors());
    app.use(authMiddleware);
};