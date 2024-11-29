import { Router } from "express";

import itemService from "../services/itemService.js";
import { createErrorMsg } from "../utils/errorUtil.js";

const router = Router();

router.get('/', async (req, res) => {
    const query = req.query;

    try {
        const items = await itemService.getAll(query);
    
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: createErrorMsg(error) });
    }
});

router.post('/', async (req, res) => {
    const userId = await req.user._id;
    const data = req.body;

    try {
        const item = await itemService.create(data, userId);

        res.json(item);
    } catch (error) {
        if (error.message.includes("validation")) {
            res.status(400).json({ message: createErrorMsg(error) });   
        } else if (error.message === 'Missing or invalid data!') {
            res.status(400).json({ message: createErrorMsg(error) })
        } else {
            res.status(500).json({ message: createErrorMsg(error) });
        }
    }
});

router.get('/:itemId', async (req, res) => {
    const itemId = req.params.itemId;

    try {
        const item = await itemService.getById(itemId);
    
        res.json(item)
    } catch (error) {
        res.status(500).json({ message: createErrorMsg(error) });
    }
});

router.delete('/:itemId', async (req, res) => {
    const itemId = req.params.itemId;

    try {
        await itemService.remove(itemId);

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: createErrorMsg(error) });
    }
});

router.put('/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    const data = req.body;

    try {
        const item = await itemService.edit(itemId, data);
    
        res.json(item);
    } catch (error) {
        if (error.message.includes("validation")) {
            res.status(400).json({ message: createErrorMsg(error) });   
        } else if (error.message === 'Missing or invalid data!') {
            res.status(400).json({ message: createErrorMsg(error) })
        } else {
            res.status(500).json({ message: createErrorMsg(error) });
        }
    }
});

export default router;
