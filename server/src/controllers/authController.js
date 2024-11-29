import { Router } from "express";

import authService from "../services/authService.js";
import { createErrorMsg } from "../utils/errorUtil.js";

const router = Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const accessToken = await authService.register(email, password);
    
        res.json(accessToken);  
    } catch (error) {
        if (error.message === "This email already registered!") {
            res.status(409).json({ message: createErrorMsg(error) });
        } else if (error.message.includes("validation")) {
            res.status(400).json({ message: createErrorMsg(error) });   
        } else {
            res.status(500).json({ message: createErrorMsg(error) });
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const accessToken = await authService.login(email, password);
    
        res.json(accessToken);  
    } catch (error) {
        if (error.message === 'User does not exist!') {
            res.status(404).json({ message: createErrorMsg(error) });
        } else if (error.message === 'Password does not match!') {
            res.status(401).json({ message: createErrorMsg(error) });   
        } else if (error.message.includes("validation")) {
            res.status(400).json({ message: createErrorMsg(error) });   
        } else {
            res.status(500).json({ message: createErrorMsg(error) });
        }
    }
});

router.get('/logout', async (req, res) => {
    const token = req.header('X-Authorization');
    await authService.logout(token); 

    res.status(204).end();
});

export default router;