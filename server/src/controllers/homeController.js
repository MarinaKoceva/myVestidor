import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {

    res.json('test');
});

export default router;